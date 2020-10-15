const Barrack = require("../models/Barrack");
const User = require("../models/User");

class barrackController {
    static list (req, res, next) {
        Barrack.find()
        .then((barracks) => {
            res.status(200).json({
                success: true, 
                data: barracks
            })
        })
    }
    static post(req, res, next) {
      User.findById(req._userId)
        .then((user) => {
          console.log(user)
          if (user) {
            if (user.resources.golds >= 30 && user.resources.foods >= 30) {
              const resources = user.resources;
              resources.golds -= 30;
              resources.foods -= 30;
              return User.updateOne({ _id: req._userId }, { resources });
          }else{
            throw { name: 'Not_Enough'};
          }
        }else{
          throw { name: 'Not_Found' };
        }
      })
      .then((_) => {
        const { nameBarrack } = req.body;
        const barrack = new Barrack ({
          _userId: req._userId, 
          nameBarrack,
         });
         return barrack.save();
      })

      .then((barrack) => {
        res.status(200).json({
          success: true,
          data: barrack,
        })
      })
      .catch(next);
      }

      static get(req, res, next) {
        const { id } = req.params;
        Barrack.findById({ _id: id})
        .then((barrack) => {
          if (barrack) {
            const soldiers = Math.floor((Date.now()- barrack.lastCollected) / 60000);
            res.status(200).json({
              success: true,
              data: barrack,
              soldiers: soldiers > 10 ? 10 : soldiers,
            });
          }else {
            throw {name: 'Not_Found'};
          }
        })
        .catch(next);
      }
    
      static put(req, res, next) {
        const { id } = req.params;
        const { nameBarrack } = req.body;
        Barrack.findById(id)
          .then((barrack) => {
            if (barrack) {
              barrack.nameBarrack = nameBarrack;
              return barrack.save();
            } else {
              throw {name: 'Not_Found'};
            }
          })
          .then((barrack) => {
            res.status(200).json({ 
              success: true, 
              data: barrack 
            });
          })
          .catch(next);
      }
    
      static delete(req, res, next) {
        const { id } = req.params;
        Barrack.findById(id)
          .then((barrack) => {
            if (barrack) {
              return barrack.remove();
            } else {
              throw {name: 'Not_Found'};
            }
          })
          .then((barrack) => {
            res.status(200).json({ 
                success: true, 
                message: 'Barrack deleted', 
                data: barrack 
              });
          })
          .catch(next);
      }
    
      static collect(req, res, next) {
        const { id } = req.params;
        let soldiers;
        Barrack.findById(id)
          .then((barrack) => {
            if (barrack) {
              soldiers = Math.floor((Date.now() - barrack.lastCollected) / 60000);
              soldiers = soldiers > 10 ? 10 : soldiers;
              barrack.lastCollected = Date.now();
              return barrack.save();
            } else {
              throw {name: 'Not_Found'};
            }
          })
          .then((barrack) => {
            return User.findById(req._userId);
          })
          .then((user) => {
            const resources = user.resources;
            resources.soldiers += soldiers;
            return User.updateOne({ _id: req._userId }, { resources: resources });
          })
          .then((result) => {
            res.status(200).json({
              success: true,
              message: `${soldiers} soldiers has been added to your resources`,
            });
          })
          .catch(next);
      }
}


module.exports = barrackController;