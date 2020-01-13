const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const {dbURI} = require('../config/environment')
const Artist = require('../models/Artist')
const artistData = require('./data/artistData')


mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => Artist.create(artistData))
  .then(() => console.log('Successfully seeded!'))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close())
