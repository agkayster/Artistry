function queryHandler(req, res, next){
  for (const key in req.query){
    // Convert boolean values to booleans
    if(req.query[key] === 'true') req.query[key] = true//to make true or false
    //work
    if(req.query[key] === 'false') req.query[key] = false

    // Convert numeric values to numbers
    if(!isNaN(req.query[key])) {
      req.query[key] = +req.query[key]//make it a number
    }

    // Convert string values to regular expression
    if(typeof req.query[key] === 'string') {
      req.query[key] = new RegExp(req.query[key], 'i')//let it be a RegExp with
      //case insensitive
    }
    // Convert array values to non-specific search
    if(req.query[key] instanceof Array) {
      req.query[key] = { $all: req.query[key] }//search for what is in the Array
      //plus every other thing.
    }
  }
  next()//once above is complete, move on to the next
}

module.exports = queryHandler
