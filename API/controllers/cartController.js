const Cart = require("../models/cartModel")

const getUserCarts = async (req, res) => {
    const user_id = req.user._id;
    try {
        const query = [
            {
                $match: {
                    user_id: user_id
                }
            },
            {
                $lookup: {
                    from: 'user',
                    localField: 'user_id',
                    foreignField: '_id',
                    as: 'user'
                }
            }
        ]
        const userCart = await Cart.aggregate(query)
        res.status(200).json({ message: "Your items in the cart", data: userCart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}

const AddToCart = async (req, res) => {
    try {
        const { product_id, user_id, quantity, total_amount} = req.body
        
        const addToCart = await Cart.create(
            { product_id, user_id, quantity, total_amount}
        )

        console.log(addToCart)      
        
    
        res.status(200).json({message: "Your items in the cart"})
    } catch (error) {
        console.log(error)
        res.status(500).json({message: "Internal server error"})
    }
}

module.exports = {getUserCarts, AddToCart}