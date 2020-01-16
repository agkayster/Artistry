const mongoose = require('mongoose')
const bcrypt = require('bcrypt')


const userSchema = new mongoose.Schema({
  username: {type: String, unique: true, required: true},
  email: {type: String, unique: true, required: true},
  password: {type: String, required: true}

},{
  toJSON: {
    transform(doc, json) {
      delete json.password
      return json
    }
  }
})



// A virtual data we need but dont want to store in the database
userSchema.virtual('passwordConfirmation')
  .set(function setPasswordConfirmation(plaintext){
    //plaintext is the value of passwordConfirmation
    this._passwordConfirmation = plaintext//temporary storing the password
  })


//Pre validate middleware: logic that happens before the VALIDATE stage
userSchema.pre('validate', function checkPasswords(next){
  //if the password and passwordConfirmation do not match
  if(this.isModified('password') && this._passwordConfirmation !== this.password){
    //invalidate the data
    this.invalidate('passwordConfirmation', 'Passwords do not match')
  }
  next()
})


userSchema.pre('save', function hashPassword(next){
  //if the password has been modified
  if(this.isModified('password')){
    //hash it using 8 rounds of salt: BCRYPT
    this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync(8))
  }
  next()//once it comes to next, it saves in the database
})

//methods is like the prototype to MONGOOSE
//all users can now validate a password themselves
userSchema.methods.validatePassword = function validatePassword(plaintext){
  return bcrypt.compareSync(plaintext, this.password)// for login purposes
}



module.exports = mongoose.model('User', userSchema)
