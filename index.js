// const express = require('express')
// const mongoose = require('mongoose')
// mongoose.plugin(require('mongoose-unique-validator'), {
//   message: 'Please choose another {PATH}'
// })
// const bodyParser = require('body-parser')
//
// const router = require('./config/routes')
// // const queryHandler = require('./lib/queryHandler')
// const errorHandler = require('./lib/errorHandler')
// const { port, dbURI } = require('./config/environment')
//
// const app = express() // create a HTTP request handler: EXPRESS
//
// // Connect to a specific database: MONGOOSE
// mongoose.connect(dbURI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
//
// app.use(express.static(`${__dirname}/dist`))
// // app.use() - tells the app to use this piece of middleware: EXPRESS
// // bodyParser.json() - tells bodyParser to handle JSON data: BODY-PARSER
// app.use(bodyParser.json())
// // queryHandler - custom middleware to modify req.query
// // to make it work better for mongoose: WE WROTE THIS
// // app.use(queryHandler)
//
// // hook up the router middleware: EXPRESS
// app.use('/api', router) // all endpoints prefixed with `/api`
//
// app.use(errorHandler)
//
// // Tell the API to listen to port 4000 for incoming requests: EXPRESS
// app.listen(port, () => console.log('listening to port 4000'))
//
// module.exports = app // Export the app for testing









const express = require('express')
const mongoose = require('mongoose')
mongoose.plugin(require('mongoose-unique-validator'), { //MONGOOSE VALIDATOR MUST ALWAYS BE AFTER REQUIRE MONGOOSE
  message: 'Please choose another {PATH}'
})
const bodyParser = require('body-parser')
const router = require('./config/routes')
const errorHandler = require('./lib/errorHandler')
const { port, dbURI } = require('./config/environment')

const app = express()

mongoose.connect(dbURI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })

app.use(express.static(`${__dirname}/dist`))

app.use(bodyParser.json())

// app.use(queryHandler)

app.use('/api', router)

app.use(errorHandler)





app.listen(port, () => console.log('Express is listening on port 4000'))

module.exports = app
