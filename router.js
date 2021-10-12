const express = require('express')
const router = express.Router()

const {
  getAllProducts,
  getAllProductsStatic,
} = require('./controller_logics')

router.route('/').get(getAllProducts)
router.route('/static').get(getAllProductsStatic)

module.exports = router
