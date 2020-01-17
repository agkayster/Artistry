const jwt = require('jsonwebtoken')
const {secret} = require('../config/environment')
const User = require('../models/User')

function secureRoute(req, res, next) {

  //if there's no authorization header OR it does'nt start with Bearer
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer')){

    //send back 401 response
    return res.sendStatus(401)
  }
  // get the token from the header (ie remove 'Bearer ')
  const token = req.headers.authorization.replace('Bearer ', '')
  // validate the token with the same secret we used to create it
  jwt.verify(token, secret, (err, payload) => {
    if(err) return res.sendStatus(401) // if it's invalid send a 401 response

    // Attempt to find the user by the sub property of the payload
    User.findById(payload.sub)
      .then(user => {
        // if we didn't find a user, send a 401 response
        if(!user) return res.sendStatus(401)

        // Add the current user to the request object
        req.currentUser = user
        next() // otherwise allow the request through
      })
  })
}

module.exports = secureRoute
