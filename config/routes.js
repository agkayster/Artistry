const router = require('express').Router()
const artistsController = require('../controllers/artists')

router.get('/', (req, res)=>{// we are listening for a GET request to the homepage
  //we would send back a response Hello world
  res.json({ message: 'Hello World!'})
})


router.route('/artists')
  .get(artistsController.index)
  .post(artistsController.create)


router.route('/artists/:id')
  .get(artistsController.show)
  .put(artistsController.update)
  .delete(artistsController.delete)

module.exports = router
