//1) check for presence of token
//2) check that secret is the right one
//3) get user from DB and update req.currentUser

const jwt = require('jsonwebtoken');
const Promise = require('bluebird');
const User = require('../models/user');
const {secret} = require('../config/environment');

function secureRoute(req, res, next){
  //1) Server gets request from client and check presence of token in header
  //look for token inside Authorisation header (where meta data is) - invalid if no authroization in header (it is like forgetting your passport at the airport...)
  if(!req.headers.authorization) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  //2) check that token is valid with that secret
  //get the token number
  const token = req.headers.authorization.replace('Bearer ', ''); //as the headers.authorization always look like Authorization: "Bearer[space]token"

  //the verify process takes a callback function but does not take a promise unfortunately, so we will create a pronise ourself and can handle error and do .then
  //returns err and payload(which contains userId and date created and expiry
  new Promise((resolve, reject) => {
    jwt.verify(token,secret, (err, payload) => {
      if(err) return reject(err);
      resolve(payload); //passed payload in resolve so we can do a .then on it
    });
  })
  //3) get user from DB and update req.currentUser
    //.then block of the promise we created
    .then(payload => User.findById(payload.sub)) //payload.sub contains id
    .then(user => {
      //in case token has user id but the user is no longer in the DB as has been deleted in the meantime
      if(!user) return res.status(401).json({message: 'Unauthorized'});
      req.currentUser = user; //to access it later on in the controller
      next(); //got to next place of middleware, like places.index for example
    })
    //error handling of that promise - if token is unvalid
    .catch(() => res.status(401).json({message: 'Unauthorized'}));
}

module.exports = secureRoute;
