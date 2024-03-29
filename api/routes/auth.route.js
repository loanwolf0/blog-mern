const express = require('express')
const {signup, signin} = require('../controllers/auth.controller')

const authRouter = express.Router()


authRouter.post('/signup', signup)
authRouter.post('/signin', signin)


module.exports = authRouter;