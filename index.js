const express = require('express')
const app = express()
const mongoose = require('mongoose')
const {dbURI} = require('./config/environment.js')
const router = require('./config/routes')
const bodyParser = require('body-parser')

mongoose.connect(dbURI, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })

app.use(bodyParser.json())

app.use(router)





app.listen(4000, () => console.log('Express is listening on port 4000'))
