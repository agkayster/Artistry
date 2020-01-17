const express = require('express')
const mongoose = require('mongoose')
const { port, dbURI } = require('./config/environment')
const router = require('./config/routes')
const bodyParser = require('body-parser')
const queryHandler = require('./lib/queryHandler')
const errorHandler = require('./lib/errorHandler')
mongoose.plugin(require('mongoose-unique-validator'), {
  message: 'Please choose another {PATH}'
})

const app = express()

mongoose.connect(dbURI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })

app.use(express.static(`${__dirname}/dist`))

app.use(bodyParser.json())

app.use(queryHandler)

app.use('/api', router)

app.use(errorHandler)





app.listen(4000, () => console.log('Express is listening on port 4000'))

module.exports = app
