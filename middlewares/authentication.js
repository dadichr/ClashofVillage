const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const {access_token} = req.headers;
    if(access_token){
        jwt.verify(access_token, 'Salt_Academy', (err, decoded) => {
            if(err) next({ name: 'Invalid_Token'});
            else {
                req._userId = decoded._id;
                next();
            }
        })
    }else next ({ name: 'Missing_Token'});
}