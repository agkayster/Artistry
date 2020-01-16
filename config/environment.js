const env =process.env.NODE_ENV || 'development'
const dbURI =`mongodb://localhost:27017/artist-gloabl-db-${env}`
const secret = 'qwertyuil'



module.exports = { dbURI, secret }
