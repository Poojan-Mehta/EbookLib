const Category = require('../models/categoryModel')

const getAllCategories = async (req, res) => {
    // const categories = await Category.find()
    const query = [
        {
            $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: 'product_category',
                as: 'produts'
            }

        }
    ]

    const categories = await Category.aggregate(query)

    res.status(200).json({messaage: "All caterogries", data: categories})
}

const getCategoryInfo = async (req, res) => {
    const category_id = req.params.id

    const category = await Category.findById(category_id)

    // const query = [
    //     {
    //         $match: {
    //             '_id' : category_id
    //         }
    //     },
    //     {
    //         $lookup: {
    //             from: 'products',
    //             localField: '_id',
    //             foreignField: 'product_category',
    //             as: 'produts'
    //         }

    //     }
    // ]

    // const category = await Category.aggregate(query)
    
    if(!category){
        res.status(400)
        throw new Error("Category not found")
    }
    res.status(200).json({message: "Category information", data: category})
}

const addCategory = async (req, res) => {
    const { category_name, category_description } = req.body

    const addCategory = await Category.create(req.body)
    res.status(200).json({message: "Category added successfully", data: addCategory})
}

const updateCategory = async (req, res) => {
    const categoryId = req.params.id
    const findCategory = await Category.findById(categoryId)

    if(!findCategory){
        res.status(404)
        throw new Error("Category not found")
    }

    const category = await Category.findByIdAndUpdate(categoryId, req.body)    
    res.status(200).json({message: "Category updated successfully", data: category})    
}

const deleteCategory = async (req, res) => {
    const categoryId = req.params.id
    const findCategory = await Category.findById(categoryId)

    if(!findCategory){
        res.status(404)
        throw new Error("Category not found")
    }

    const category = await Category.findByIdAndDelete(categoryId)
    res.status(200).json({message: "Category deleted successfully", data: category})
}

const productCategory = async (req, res) => {
    const categoryId = req.params.id

    const getAllProducts = await Category.findById(categoryId).populate('category_products').exec()

    if(!getAllProducts){
        res.status(404),json({message: "Not found"})
    }

    res.status(200).json({message: "Get all products", data: getAllProducts})
}

module.exports = { getAllCategories, getCategoryInfo, addCategory, updateCategory, deleteCategory, productCategory}