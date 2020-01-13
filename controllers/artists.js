const Artist = require('../models/Artist')

function indexRoute(req, res) {
  console.log(req.query)
  Artist.find(req.query)
    .then(artists => res.json(artists))
}

function showRoute(req, res) {
  //the ID is now on req.params.id
  Artist.findById(req.params.id)// Request the paramenters of a particular ID, get the artist from the database:MONGOOSE
    .then(artist =>{
      if (!artist) return res.sendStatus(404)

      return res.json(artist) //send it to JSON:EXPRESS
    })
}


function createRoute(req, res){
  const artist = new Artist(req.body)// fill the new artist form with information from the body of the request. create a new artist: MONGOOSE

  artist.save() //save it in the database
    .then(artist => res.status(201).json(artist))// send it back to json
}

function updateRoute(req, res){
  Artist.findById(req.params.id)// Request the paramenters of a particular ID, get the artist from the database:mongoose
    .then(artist => {
      if (!artist) return res.sendStatus(404)//return a 404:EXPRESS

      return artist.set(req.body)//update the artist with the request data
    })
    .then(artist => artist.save())//save the artist: MONGOOSE
    .then(artist => res.json(artist))// send the updated artist: MONGOOSE
}

function deleteRoute(req, res){
  Artist.findById(req.params.id)// Request the paramenters of a particular ID, get the artist from the database:mongoose
    .then(artist => {
      if (!artist) return res.sendStatus(404)//return a 404:EXPRESS


      return artist.remove()//remove the artist: MONGOOSE
        .then(() => res.sendStatus(204))// return a 204: EXPRESS
    })
}




module.exports = {
  index: indexRoute,
  show: showRoute,
  create: createRoute,
  update: updateRoute,
  delete: deleteRoute
}
