const Market = require("../models/Market");
const User = require("../models/User");

class marketController {
    static list (req, res, next) {
        Market.find()
        .then((markets) => {
            res.status(200).json({
                success: true, 
                data: markets
            })
        })
    }
    static post(req, res, next) {
      User.findById(req._userId)
        .then((user) => {
          console.log(user)
          if (user) {
            if (user.resources.golds >= 30 && user.resources.foods >= 10) {
              const resources = user.resources;
              resources.golds -= 30;
              resources.foods -= 10;
              return User.updateOne({ _id: req._userId }, { resources });
          }else{
            throw { name: 'Not_Enough'};
          }
        }else{
          throw { name: 'Not_Found' };
        }
      })
      .then((_) => {
        const { nameMarket } = req.body;
        const market = new Market ({
          _userId: req._userId, 
          nameMarket,
         });
         return market.save();
      })

      .then((market) => {
        res.status(200).json({
          success: true,
          data: market,
        })
      })
      .catch(next);
      }

      static get(req, res, next) {
        const { id } = req.params;
        Market.findById({ _id: id})
        .then((market) => {
          if (market) {
            const golds = Math.floor((Date.now()- market.lastCollected) / 60000);
            res.status(200).json({
              success: true,
              data: market,
              golds: golds > 50 ? 50 : golds,
            });
          }else {
            throw {name: 'Not_Found'};
          }
        })
        .catch(next);
      }
    
      static put(req, res, next) {
        const { id } = req.params;
        const { nameMarket } = req.body;
        Market.findById(id)
          .then((market) => {
            if (market) {
              market.nameMarket = nameMarket;
              return market.save();
            } else {
              throw {name: 'Not_Found'};
            }
          })
          .then((market) => {
            res.status(200).json({ 
              success: true, 
              data: market 
            });
          })
          .catch(next);
      }
    
      static delete(req, res, next) {
        const { id } = req.params;
        Market.findById(id)
          .then((market) => {
            if (market) {
              return market.remove();
            } else {
              throw {name: 'Not_Found'};
            }
          })
          .then((market) => {
            res.status(200).json({ 
                success: true, 
                message: 'Market deleted', 
                data: market 
              });
          })
          .catch(next);
      }
    
      static collect(req, res, next) {
        const { id } = req.params;
        let golds;
        console.log(golds)
        Market.findById(id)
          .then((market) => {
            if (market) {
              golds = Math.floor((Date.now() - market.lastCollected) / 60000);
              golds = golds > 50 ? 50 : golds;
              market.lastCollected = Date.now();
              return market.save();
            } else {
              throw {name: 'Not_Found'};
            }
          })
          .then((market) => {
            return User.findById(req._userId);
          })
          .then((user) => {
            console.log(golds)
            const resources = user.resources;
            resources.golds += golds;
            return User.updateOne({ _id: req._userId }, { resources: resources });
          })
          .then((result) => {
            res.status(200).json({
              success: true,
              message: `${golds} golds has been added to your resources`,
            });
          })
          .catch(next);
      }
}


module.exports = marketController;