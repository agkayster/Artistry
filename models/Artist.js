const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  content: {type: String, required: true, maxlength: 300},
  rating: {type: Number, min: 1, max: 5, required: true },
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
},{
  timestamps: true
})


const artistSchema = new mongoose.Schema({
  name: {type: String, required: true, unique: true, minlength: 2},
  image: {type: String, required: true},
  stageName: {type: String, required: true, minlength: 2},
  nationality: {type: String, required: true},
  dateOfBirth: {type: String, required: true},
  genre: [String, true],
  occupation: [String, true],
  instruments: [String, true],
  yearsActive: {type: String, required: true},
  labels: [String,true],
  associatedActs: [String, true],
  comments: [commentSchema],
  user: {type: mongoose.Schema.ObjectId, ref: 'User'}
})

module.exports = mongoose.model('Artist', artistSchema)
