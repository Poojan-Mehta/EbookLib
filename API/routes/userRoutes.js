const express = require('express')
const checkAuthentication = require('../middleware/authMiddleware')

const Router = express.Router()
const { getAllUsers, getUserInfo, createNewUser, updateUserInfo, deleteUser, loginUser } = require("../controllers/userController")

Router.get('', checkAuthentication, getAllUsers)

Router.get('/:id', getUserInfo)

Router.post('', createNewUser)

Router.put('/:id', updateUserInfo)

Router.delete('/:id', deleteUser)

Router.post('/login', loginUser)

module.exports = Router