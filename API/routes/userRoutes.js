const express = require('express')

const Router = express.Router()
const { getAllUsers, getUserInfo, createNewUser, updateUserInfo, deleteUser } = require("../controllers/userController")

Router.get('', getAllUsers)

Router.get('/:id', getUserInfo)

Router.post('', createNewUser)

Router.put('/:id', updateUserInfo)

Router.delete('/:id', deleteUser)

module.exports = Router