const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.protect = async (req,res,next)=>{
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }
    if (!token){
        return res.status(401).json({
            success: false,
            msg: 'Not authorized to access this route'
        })
    }
    try{
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        console.log(decode);
        req.user = await User.findById(decode.id)

        next()
    }catch(e){
        console.error(err.stack)
        return res.status(401).json({
            success: false,
            msg: 'Not authorized to access this route'
        })
    }
    
}