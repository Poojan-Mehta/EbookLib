const express = require('express')
const checkAuthentication = require('../middleware/authMiddleware')

const Router = express.Router()
const { getAllUsers, getUserInfo, createNewUser, updateUserInfo, deleteUser, loginUser, generateAccessAndRefereshTokensWhenExpire } = require("../controllers/userController")

Router.get('', checkAuthentication, getAllUsers)

Router.get('/:id', checkAuthentication, getUserInfo)

Router.post('', createNewUser)

Router.put('/:id', updateUserInfo)

Router.delete('/:id', deleteUser)

Router.post('/login', loginUser)

Router.post('/refreshToken', generateAccessAndRefereshTokensWhenExpire)

module.exports = Router