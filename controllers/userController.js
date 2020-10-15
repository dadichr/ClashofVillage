const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


class UserController {
    static register(req, res, next) {
        const {username, email, password} = req.body;
        const user = new User ({
            username,
            email,
            password,
            townhall: username,
        });
        
        user.save().then((user) => {
            res.status(201).json({
                message: 'Register Success, Welcome to the Game',
                data: user,
            });
        })
        .catch(next);
    }

    
    static registerFind(req, res, next) {
        User.find().then((user) => {
            res.status(200).json({
                message: 'Users List',
                data: user,
            });
        })
        .catch(next);
    }


    static registerFindId(req, res, next) {
        const {UserId} = req.params
        User.findById(UserId).then((user) => {
            res.status(200).json({
                message: 'Success Search User Id',
                data: user,
            });
        })
        .catch(next);
    }

    static registerModify (req, res, next) {
        const { username, email, townhall} = req.body
        const {UserId} = req.params

        const updateData = {
            username: username,
            email: email,
            townhall: townhall,
        }


        for (let key in updateData) {
            if(!updateData[key]) {
                delete updateData[key]
            }
        }


        User.findByIdAndUpdate(UserId, updateData, {new: true})
        .then((user) => {
            res.status(200).json({
                message: 'Success Update Name',
                data: user,
            });
        })
        .catch(next);
    }


    static registerDelete (req, res, next) {
        const {UserId} = req.params
        User.findById (UserId).then((user) => {
            res.status(200).json({
                message: 'Success Deleted User',
                data: user.remove(),
            })
        })
        .catch(next);
    }



    static login(req, res, next) {
        const {email, password} = req.body;
        User.findOne({email})
        .then((user) => {
            if (user && bcrypt.compareSync(password, user.password)){
                    const access_token = jwt.sign({_id: user._id}, 'Salt_Academy')
                    res.status(200).json({
                        message: 'Login Success',
                        access_token,
                    })
            }else throw { name: 'Login_Fail' };
        })
        .catch(next);
    }
}

module.exports = UserController;