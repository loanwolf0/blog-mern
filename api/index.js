const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const app = express();


mongoose.connect(process.env.MONGO)

.then(() => {
    console.log('mongoDB is connected');
})

.catch((err) => {
    console.log({"ERROR" : err});
})

app.listen(3000, () => {
    console.log('App is runnig');
})