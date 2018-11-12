const router = require('express').Router()
const entertainmeRouter = require('./entertainme')

router.use('/entertainme', entertainmeRouter)

module.exports = router