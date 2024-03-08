const express = require('express')
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.route.js');
const authRouter = require('./routes/auth.route.js');
require('dotenv').config()

const app = express();


app.use(express.json())


mongoose
    .connect(process.env.MONGO)

    .then(() => {
        app.listen(3000, () => {
            console.log('App is runnig');
        })
    })
    
    .catch((err) => {
        console.log({"ERROR" : err});
    })

app.use('/api/user', userRoutes)
app.use('/api/auth', authRouter)



// middle ware

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500
    const message = err.message || 'Internal Server Error'

    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    })
})