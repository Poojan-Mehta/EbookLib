const Product = require('../models/productModel')

getAllProducts = async (req, res) => {
    const products = await Product.find()
    console.log(products)
    
    res.status(200).json({message: "Products", data: products})
}

getProductInfo = async (req, res) => {
    const productId = req.params.id
    const product = await Product.findById(productId).populate('product_category').exec()

    if(!product){
        res.status(400).json({message: "Product not found"})
    }

    res.status(200).json({message: "Product information", data: product})
}

addProduct = async (req, res) => {
    const { product_name, product_description, product_category, quantity, price} = req.body

    const product = await Product.create({
        product_name,
        product_description,
        product_category,
        quantity,
        price
    })

    res.status(200).json({message: "Product added successfully",data: product})
}

updateProduct = async (req, res) => {
    const productId = req.params.id

    const productAvailable = await Product.findById(productId)
    if(!productAvailable){
        res.status(404)
        res.json({message: "Product not available"})
    }

    const updateProduct = await Product.findByIdAndUpdate(productId, res.body)
    res.status(200)
    res.json({message: "Product updated successfully", data: updateProduct})
}

deleteProduct = async (req, res) => {
    const productId = req.params.id

    const product = await Product.findByIdAndDelete(productId)

    res.status(200).json({message: "Delete product successfully", data: product})
}

module.exports = { getAllProducts, getProductInfo, addProduct, updateProduct, deleteProduct }