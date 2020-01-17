const User = require('../models/User')
const jwt = require('jsonwebtoken')
const {secret} = require('../config/environment')


function registerRoute(req, res, next) {
  User.create(req.body)
    .then((user) => res.json({ user }))
    .catch(next)
}

function loginRoute(req, res, next) {
  User.findOne({ email: req.body.email })
    .then(user => {
      // if the user does not exist OR the user password is not valid
      if(!user || !user.validatePassword(req.body.password)) {
        return res.sendStatus(401) // send a 401 response
      }
      // generate a token
      const token = jwt.sign({ sub: user._id }, secret, { expiresIn: '6h' })
      // send it to the client
      res.json({ message: `Welcome back ${user.username}!`, token, user})
    })
    .catch(next)
}


module.exports = {
  register: registerRoute,
  login: loginRoute
}
