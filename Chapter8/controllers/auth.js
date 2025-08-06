const User = require('../models/User')
exports.register = async (req,res,next)=>{
    try{
        const {name, password, email, role} = req.body
        const user = await User.create({
            name,
            email,
            password,
            role
        })
        const token = user.getSignedJwtToken()
        res.status(201).json({
            success: true,
            token: token
        })
        // returned token immediately because auto login after registration
    }catch(e){
        res.status(400).json({
            success: false,
            msg: e.message || 'Unknown error occurred while registering user'
        })
    }
}
exports.login = async (req,res,next)=>{
    const {email, password} = req.body
    if (!email || !password){
        return res.status(400).json({
            success: false,
            msg: 'Please provide email and password'
        })
    }
    const user = await User.findOne({email}).select('+password')
    if (!user){
        res.status(400).json({
            success: false,
            msg: "Invalid credentials"
        })
    }
    const isMatch = await user.matchPassword(password)
    if (!isMatch){
        return res.status(401).json({
            success: false,
            msg: "Invalid credentials"
        })
    }
    const token = user.getSignedJwtToken()
    res.status(200).json({
        success: true,
        token: token
    })
}