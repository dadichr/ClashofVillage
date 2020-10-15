const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
        username: { 
            type: String, 
            required: true,
            minlength: [3, 'Username must be more than 3 characters!!'],
            maxlength: [8, 'Username cannot be more than 8 characters!!']
        },
        email: { 
            type: String, required: true, 
            default: 'example@gmail.com', 
            match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Email Not Valid!!'] 
        },
        password: { 
            type: String, 
            required: true,
            minlength: [8, 'Password must be more than 8 characters!!'],
            maxlength: [12, 'Username cannot be more than 12 characters!!']
        },
        townhall: { type: String, required: true },
        medals: {type: Number, default: 0},
        resources: {
            foods: { type: Number, default: 100 },
            golds: { type: Number, default: 100 },
            soldiers: { type: Number, default: 0 },
        }
      },
       {
           timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt'},
       }
    )

userSchema.pre('save', function (next) {
    User.findOne ({
        email: this.email
    })
    .then(user => {
        if(user) next({
            name: 'Already_Exists'
        });
        else {
            const salt = bcrypt.genSaltSync(10);
            this.password = bcrypt.hashSync(this.password, salt);
            next();
        }
    })
    .catch((e) => next ({name: 'Mongoose_Error'}))
})


const User = mongoose.model('User', userSchema)

module.exports = User;