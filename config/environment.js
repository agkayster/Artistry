const env =process.env.NODE_ENV || 'development'
const port = process.env.PORT || 4000
const dbURI =process.env.MONGODB_URI || `mongodb://localhost:27017/artists-db-${env}`
const secret = process.env.SECRET || 'Tgs5aG_^GH@lKmnN'



module.exports = { dbURI, secret, port, env }
