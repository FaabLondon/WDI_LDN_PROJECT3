const User = require('../models/user');
const jwt = require('jsonwebtoken');
const {secret} = require('../config/environment');

// sends back the user and a token
function register(req, res, next){
  User.create(req.body)
    .then(user => {
      //make our token with Payload(user id), secret, expire
      const token = jwt.sign({sub: user._id}, secret , {expiresIn: '6h'});
      res.json({
        message: 'Thank you for registering',
        user,
        token  //shorthand for token: token
        //could also send back user data
      });
    })
    .catch(next);
}

function login(req, res, next){
  User.findOne({email: req.body.email})
    .then(user => {
      if(!user || !user.validatePassword(req.body.password)){
        return res.status(401).json({message: 'Unauthorized'});
      }
      //we return a token only is user exists and password match with the one in DB
      //will return a slightly different token as the time created and expiry would be different
      const token = jwt.sign({sub: user._id}, secret, {expiresIn: '6h'});
      res.json({
        message: user.username,
        token
      });
    })
    .catch(next);
}

module.exports ={
  register,  //same as register: register
  login
};
