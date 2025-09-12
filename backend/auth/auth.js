const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../database/userSchema.js');

const login = async(req, res)=>{
    try {
        const { email, password } = req.body;

        //check for user
        const user = await User.findOne({email});
        if(!user) res.status(400).json({
            message: "User doesn't exists",
            success: false
            });
        
        // check password 
        const isMatch = await bcrypt.compare(password, user.password);  
        if(!isMatch) return res.status(400).json({
            message: "Invalid credentials",
            success: false
        });
        const token = jwt.sign({ id: user._id, email: user.email, name: user.name  }, process.env.JWT_SECRET, { expiresIn: '31d' });
        return res.status(200).json({
            message: "Login successful",
            success: true,
            user: {
                id: user._id,
                email: user.email,
                username: user.name
            },
            token: token
        });
    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}


const signup = async(req, res)=>{
    try {
        const { name, email, password } = req.body;

        //check for user
        const user = await User.findOne({email});
        if(user){ 
            return res.status(400).json({
            message: "User already exists",
            success: false
            });
        }
        // create user 
        const newUser = new User({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id, email: newUser.email, name: newUser.name  }, process.env.JWT_SECRET, { expiresIn: '1h' });
        return res.status(200).json({
            message: "Signup successful",
            success: true,
            user: {
                id: newUser._id,
                email: newUser.email
            },
            token: token
        });
    } catch (error) {
        console.error("Signup error:", error);
        return res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
}


module.exports = {
    login,
    signup
}