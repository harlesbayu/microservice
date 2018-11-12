const router = require('express').Router()
const Controller = require('../controllers/seriesControllers')

router.get('/', Controller.findAll)
router.post('/create', Controller.create)
router.put('/update/:id', Controller.update)
router.delete('/remove/:id', Controller.delete)

module.exports = router