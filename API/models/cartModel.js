const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.ObjectId,
        ref: 'product',
        required: true
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    total_amount: {
        type: Number,
        requied: true
    }
},{
    timestamps: true
})

module.exports = mongoose.model('cart', cartSchema)