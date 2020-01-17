const env =process.env.NODE_ENV || 'development'
const port = process.env.PORT || 4000
const dbURI =process.env.MONGODB_URI || `mongodb://localhost:27017/artist-gloabl-db-${env}`
const secret = process.env.SECRET || 'qwertyuil'



module.exports = { dbURI, secret, port, env }
