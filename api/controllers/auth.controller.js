const { user } = require("../models/user.model");
const bcryptjs = require('bcryptjs');
const errorHandler = require("../utils/error");
const jwt = require('jsonwebtoken')

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




// sign in

const signin = async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password || email === '' || password === '') {
      next(errorHandler(400, 'All fields are required'));
    }
  
    try {
      const validUser = await user.findOne({ email });
      if (!validUser) {
        return next(errorHandler(404, 'User not found'));
      }
      const validPassword = bcryptjs.compareSync(password, validUser.password);
      if (!validPassword) {
        return next(errorHandler(400, 'Invalid password'));
      }
      const token = jwt.sign(
        { id: validUser._id },
        process.env.JWT_SECRET
      );
  
      const { password: pass, ...rest } = validUser._doc;
  
      res
        .status(200)
        .cookie('access_token', token, {
          httpOnly: true,
        })
        .json(rest);
        
    } catch (error) {
      next(error);
    }
  };


module.exports = {signup, signin};