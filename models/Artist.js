const mongoose = require('mongoose')

const artistSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true, minlength: 2},
  nationality: {type: String, required: true},
  dateOfBirth: {type: String, required: true},
  genre: [String, true],
  occupation: [String, true],
  instruments: [String, true],
  yearsActive: {type: String, required: true},
  labels: [String,true],
  associatedActs: [String, true]
})

module.exports = mongoose.model('Artist', artistSchema)
