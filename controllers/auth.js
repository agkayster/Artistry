const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {secret} = require('../config/environment')


function registerRoute(req, res){
  User.create(req.body)
    .then(() => res.json({message: 'Registration successful'}))
    .catch(err => res.status(422).json(err))
}

function loginRoute(req, res){
  User.findOne({email: req.body.email})//get this from user in User model
    .then(user =>{
      if(!user || !user.validatePassword(req.body.password)){//user here is
        //specific
        return res.sendStatus(401)
      }

      //generate a token
      //send it to the client
      const token = jwt.sign({sub: user._id}, secret, {expiresIn: '6h'})
      res.json({message: `Welcome back ${user.username}!`, token})
    })
}



module.exports = {
  register: registerRoute,
  login: loginRoute
}
