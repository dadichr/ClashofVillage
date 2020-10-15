const Farm = require("../models/Farm");
const User = require("../models/User");

class farmController {
    static list (req, res, next) {
        Farm.find()
        .then((farms) => {
            res.status(200).json({
                success: true, 
                data: farms
            })
        })
    }
    static post(req, res, next) {
      User.findById(req._userId)
        .then((user) => {
          console.log(user)
          if (user) {
            if (user.resources.golds >= 10 && user.resources.foods >= 30) {
              const resources = user.resources;
              resources.golds -= 10;
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
        const { nameFarm } = req.body;
        const farm = new Farm ({
          _userId: req._userId, 
          nameFarm,
         });
         return farm.save();
      })

      .then((farm) => {
        res.status(200).json({
          success: true,
          data: farm,
        })
      })
      .catch(next);
      }

      static get(req, res, next) {
        const { id } = req.params;
        Farm.findById({ _id: id})
        .then((farm) => {
          if (farm) {
            const foods = Math.floor((Date.now()- farm.lastCollected) / 60000);
            res.status(200).json({
              success: true,
              data: farm,
              foods: foods > 20 ? 20 : foods,
            });
          }else {
            throw {name: 'Not_Found'};
          }
        })
        .catch(next);
      }
    
      static put(req, res, next) {
        const { id } = req.params;
        const { nameFarm } = req.body;
        Farm.findById(id)
          .then((farm) => {
            if (farm) {
              farm.nameFarm = nameFarm;
              return farm.save();
            } else {
              throw {name: 'Not_Found'};
            }
          })
          .then((farm) => {
            res.status(200).json({ 
              success: true, 
              data: farm 
            });
          })
          .catch(next);
      }
    
      static delete(req, res, next) {
        const { id } = req.params;
        Farm.findById(id)
          .then((farm) => {
            if (farm) {
              return farm.remove();
            } else {
              throw {name: 'Not_Found'};
            }
          })
          .then((farm) => {
            res.status(200).json({ 
                success: true, 
                message: 'Farm has been deleted', 
                data: farm 
              });
          })
          .catch(next);
      }
    
      static collect(req, res, next) {
        const { id } = req.params;
        let foods;
        Farm.findById(id)
          .then((farm) => {
            if (farm) {
              foods = Math.floor((Date.now() - farm.lastCollected) / 60000);
              foods = foods > 20 ? 20 : foods;
              farm.lastCollected = Date.now();
              return farm.save();
            } else {
              throw {name: 'Not_Found'};
            }
          })
          .then((farm) => {
            return User.findById(req._userId);
          })
          .then((user) => {
            const resources = user.resources;
            resources.foods += foods;
            return User.updateOne({ _id: req._userId }, { resources: resources });
          })
          .then((result) => {
            res.status(200).json({
              success: true,
              message: `${foods} foods has been added to your resources`,
            });
          })
          .catch(next);
      }
}


module.exports = farmController;