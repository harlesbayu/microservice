const router = require('express').Router()
const Controller = require('../controllers/moviesControlles')

router.get('/', Controller.findAll)
router.post('/create', Controller.create)
router.put('/update/:id', Controller.update)
router.delete('/remove/:id', Controller.delete)

module.exports = router