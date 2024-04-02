const express = require('express')
const { getAllProducts, getProductInfo, addProduct, updateProduct, deleteProduct} = require('../controllers/productController')

const Router = express.Router()
Router.get('', getAllProducts)
Router.get('/:id', getProductInfo)
Router.post('', addProduct)
Router.put('/:id', updateProduct)
Router.delete('/:id', deleteProduct)

module.exports = Router