const router = require('express').Router()
const Controller = require('../controllers/entertainmeController')

router.get('/movies', Controller.findAllMovie)
router.get('/tv', Controller.findAllSeries)
router.post('/movies', Controller.createDataMovie)
router.post('/tv', Controller.createDataTv)

module.exports = router