const { user } = require("../models/user.model");
const bcryptjs = require('bcryptjs')


const signup = async (req, res) => {
    console.log(req.body);

    const {username, email, password} = req.body;

    if( !username || !email || !password || username === '' || email=== '' || password === '' ){
        return res.status(400).json({Message: "All fields are required"})
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
        res.status(500).json({Message: error})
        
    }
    

}


module.exports = signup;