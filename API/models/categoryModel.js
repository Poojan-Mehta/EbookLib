const mongoose = require('mongoose')

const caterogySchema = new mongoose.Schema({
    category_name:{
        type: String,
        required: [true, "Category name is mendatory."]
    },
    category_description:{
        type: String,
        required: [true, "Category description is mendatory."]
    }
},
{
    timestamps: true
})

module.exports = mongoose.model('categories', caterogySchema)