const router = require('express').Router()
const artistsController = require('../controllers/artists')
const authController = require('../controllers/auth')
const secureRoute = require('../lib/secureRoute')

router.get('/', (req, res)=>{// we are listening for a GET request to the homepage
  //we would send back a response Hello world
  res.json({ message: 'Hello World!'})
})


router.route('/artists')
  .get(artistsController.index)
  .post(secureRoute, artistsController.create)


router.route('/artists/:id')
  .get(artistsController.show)
  .put(secureRoute, artistsController.update)
  .delete(secureRoute, artistsController.delete)

router.post('/artists/:id/comments', secureRoute, artistsController.commentCreate)
router.delete('/artists/:id/comments/:commentId', secureRoute, artistsController.commentDelete)


router.post('/register', authController.register)
router.post('/login', authController.login)

module.exports = router
