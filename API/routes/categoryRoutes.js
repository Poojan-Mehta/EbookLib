const express = require("express")
const { getAllCategories, getCategoryInfo, addCategory, updateCategory, deleteCategory, productCategory } = require('../controllers/categoryController')

const Router = express.Router()

Router.get('', getAllCategories)

Router.get('/:id', getCategoryInfo)

Router.post('', addCategory)

Router.put('/:id', updateCategory)

Router.delete('', deleteCategory)

Router.get('/:id/products', productCategory)

module.exports = Router