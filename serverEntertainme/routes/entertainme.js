const router = require('express').Router()
const Controller = require('../controllers/entertainmeController')

router.get('/', Controller.findAll)
router.post('/movies', Controller.createDataMovie)
router.post('/tv', Controller.createDataTv)
// router.get('/tv', Controller.findAll)

module.exports = router