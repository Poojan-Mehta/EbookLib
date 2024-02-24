const User = require('../models/userModel')
const expressHandler = require('express-async-handler')

const getAllUsers = async (req, res) => {

    const users = await User.find();
    res.status(200).json({message: "Get all users", data: users}) 
}

const getUserInfo = async(req, res) => {
    const user = await User.findById(req.params.id)

    res.status(200).json({message: "User information", data: user})
}

const createNewUser = expressHandler(async (req, res) => {
    
    const { name, email, contact } = req.body    

    const user = await User.create({
        name, email, contact
    })
    res.status(200).json({message: "User added succssfully", data: user})
    
})

const updateUserInfo = async(req, res) => {
    let userId = req.params.id
    const findUser = await User.findById(userId)
    if(!findUser){
        res.status(404)
        throw new Error("User not found")
    }

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {new: true})
    
    res.status(200).json({message: "User infomation", data: updatedUser})
}

const deleteUser = async(req, res) => {
    const userId = req.params.id

    const findUser = await User.findById(userId)
    if(!findUser){
        res.status(404)
        throw new Error("User not found")    
    }

    const deleteUser = await User.findByIdAndDelete(userId)
    res.status(200).json({message: "User deleted successfully...", data: deleteUser})
}

module.exports = { getAllUsers, getUserInfo, createNewUser, updateUserInfo, deleteUser}