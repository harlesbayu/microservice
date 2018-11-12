const router = require('express').Router()
const seriesRouter = require('./series')

router.use('/tv', seriesRouter)

module.exports = router