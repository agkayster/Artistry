const jwt = require('jsonwebtoken')
const {secret} = require('../config/environment')
const User = require('../models/User')

function secureRoute(req, res, next) {

  //if there's no authorization header OR it does'nt start with Bearer
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')){

    //send back 401 response
    return res.sendStatus(401)
  }
  const token = req.headers.authorization.replace('Bearer ', '')

  // validate the token with the same secret we used to create it
  jwt.verify(token, secret,  (err, payload) => {
    User.findById(payload.sub)
      .then(user =>{
        if(!user) return res.sendStatus(401)// means Unauthorized
        req.currentUser = user
        next()// otherwise allow the request through
      })
  })
}

module.exports = secureRoute
