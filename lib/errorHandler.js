function errorHandler(err, req, res, next) {
  if(err.name === 'ValidationError'){
    for (const key in err.errors){
      err.errors[key] = err.errors[key].message
    }
    //send validation error
    return res.status(422).json({errors: err.errors})
  }
  res.sendStatus(500)
  next(err)
}
module.exports = errorHandler
