const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = (req, res, next) => {
    //Get the token from the header 
    const token =  req.header('x-auth-token');

    //Check if the token does not exist
    if(!token){
        return res.status(401).json({ msg: 'No token, authorization denied'}); //401 is unauthorized
    }
        try{
            const decoded = jwt.verify(token, config.get('jwtSecret'));

            req.user = decoded.user;
            next();
        }
        catch(err){
           return res.status(401).json({ msg: 'Token not valid'});
        }
}








