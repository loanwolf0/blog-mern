const { user } = require("../models/user.model");
const bcryptjs = require('bcryptjs');
const errorHandler = require("../utils/error");


const signup = async (req, res, next) => {
    console.log(req.body);

    const {username, email, password} = req.body;

    if( !username || !email || !password || username === '' || email=== '' || password === '' ){

        // in utils we have created our own error handler
        next(errorHandler(400, "All fields are required! "))
    }


    const hashPassword = bcryptjs.hashSync(password, 10)

    const newUser = new user ( {
        username,
        email,
        password: hashPassword
    })

    try {
        await newUser.save();
        res.json({Message: "Signup successful"})

    } catch (error) {
        // using middle ware
        next(error)
        
    }
    

}


module.exports = signup;