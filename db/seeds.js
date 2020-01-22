const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const {dbURI} = require('../config/environment')
const Artist = require('../models/Artist')
const User = require('../models/User')
let artistData = require('./data/artistData')
const userData = require('./data/userData')


mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => User.create(userData))
  .then(users => {
    artistData = artistData.map(artist => {// THIS IS TO GENERATE SYSTEM PRODUCED COMMENTS AND RATINGS FOR USERS IN THE COMMENT COMPONENT
      artist.user = users[0]

      if(artist.comments) {
        artist.comments = artist.comments.map((comment, index) => {
          comment.user = index % 2 === 0 ? users[1] : users[2]
          return comment
        })
      }
      return artist
    })
    return Artist.create(artistData)
  })
  .then(() => console.log('Successfully seeded!'))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close())
