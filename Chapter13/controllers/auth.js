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
        tokenResponse(user, 200, res)
    }catch(e){
        res.status(400).json({
            success: false,
            message: e.message || 'Unknown error occurred while registering user'
        })
    }
}
exports.login = async (req,res,next)=>{
    try{
        const {email, password} = req.body
        if (!email || !password){
            return res.status(400).json({
                success: false,
                message: 'Please provide email and password'
            })
        }
        const user = await User.findOne({email}).select('+password')
        if (!user){
            res.status(400).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        const isMatch = await user.matchPassword(password)
        if (!isMatch){
            return res.status(401).json({
                success: false,
                message: "Invalid credentials"
            })
        }
        tokenResponse(user, 200, res)
    }catch(e){
        console.error(e.stack);
        res.status(401).json({
            success: false,
            message:'Cannot convert email or password to string'
        })
    }
    
}

exports.getMe = async (req,res,next)=>{
    const user = await User.findById(req.user.id)
    res.status(200).json({
        success: true,
        data:user
    })
}
// ...roles is syntax for function can accept multiple arguments sucas array that contain 'user' and 'admin' on the same time
exports.Logout = async(req,res,next)=>{
    res.status(200).cookie('token','none',{
        expires: new Date(Date.now() + 10*1000),
        httpOnly: true
    }).json({
        success:true,
        data: {}
    })
}

const tokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken()
    const options = {
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true,
    }
    if (process.env.NODE_ENV === 'production'){
        options.secure = true
    }
    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        _id: user._id,
        name: user.name,
        email: user.email,
        token
    })
}

