const Artist = require('../models/Artist')

function indexRoute(req, res, next) {
  // get all the artists from the database: MONGOOSE
  Artist.find(req.query)
    .then(artists => res.json(artists)) // send them as JSON: EXPRESS
    .catch(next)
}


function showRoute(req, res, next) {
  // the ID is now on req.params.id
  Artist.findById(req.params.id) // get the artist from the database: MONGOOSE
    .populate({ path: 'user', select: '-email' }) // replace the user ID with the actual user object, and DON'T send the email address...
    .populate({ path: 'comments.user', select: '-email' }) // replace the user ID with the actual user object
    .then(artist => {
      if(!artist) return res.sendStatus(404) // return a 404: EXPRESS

      return res.json(artist) // send it as JSON: EXPRESS
    })
    .catch(next)
}


function createRoute(req, res, next) {
  // Add the current user to the req.body so that it will
  // be automatically added to the new artist
  req.body.user = req.currentUser._id

  const artist = new Artist(req.body) // create a new artist: MONGOOSE

  artist.save() // save it in the database: MONGOOSE
    .then(artist => res.status(201).json(artist)) // send it as JSON: EXPRESS
    .catch(next) // send any errors to the error handling middleware
}

function updateRoute(req, res, next) {
  Artist.findById(req.params.id) // get the artist from the database: MONGOOSE
    .then(artist => {
      if(!artist) return res.sendStatus(404) // return a 404: EXPRESS

      if(!req.currentUser.equals(artist.user)) return res.sendStatus(401)

      return artist.set(req.body) // update the artist with the request data
    })
    .then(artist => artist.save()) // save the artist: MONGOOSE
    .then(artist => res.json(artist)) // send the updated artist: EXPRESS
    .catch(next)
}

function deleteRoute(req, res, next) {
  Artist.findById(req.params.id) // get the artist from the database: MONGOOSE
    .then(artist => {
      if(!artist) return res.sendStatus(404) // return a 404: EXPRESS

      if(!req.currentUser.equals(artist.user)) return res.sendStatus(401)

      return artist.remove() // remove the artist: MONGOOSE
        .then(() => res.sendStatus(204)) // return a 204: EXPRESS
    })
    .catch(next)
}

function commentCreateRoute(req, res, next){
  req.body.user = req.currentUser._id
  Artist.findById(req.params.id)
    .then(artist =>{
      if(!artist) return res.sendStatus(404)
      artist.comments.push(req.body)
      return artist.save()
    })
    .then(artist => Artist.populate(artist, 'user comments.user'))
    .then(artist => res.json(artist))
    .catch(next)
}


function commentDeleteRoute(req, res, next) {
  Artist.findById(req.params.id)
    .then(artist => {
      if(!artist) return res.sendStatus(404)

      // Find the comment by its ID
      const comment = artist.comments.id(req.params.commentId)
      if(!comment) return res.sendStatus(404)

      comment.remove() // remove the comment
      return artist.save() // save the artist
    })
    .then(artist => Artist.populate(artist, 'user comments.user'))
    .then(artist => res.json(artist))
    .catch(next)
}





module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute,
  commentCreate: commentCreateRoute,
  commentDelete: commentDeleteRoute
}
