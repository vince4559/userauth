const express = require('express')
const userRouter = express.Router()
const {signUp, login, verifyToken, getUser, refreshToken, logOut} = require('../controllers/UserController')


userRouter.post('/signup', signUp)
userRouter.post('/login', login)
userRouter.get('/user', verifyToken, getUser)
userRouter.get('/refresh', refreshToken, verifyToken, getUser)
userRouter.post('/logout',verifyToken, logOut)

module.exports = userRouter