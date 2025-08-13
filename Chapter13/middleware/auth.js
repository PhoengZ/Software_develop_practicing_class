const jwt = require('jsonwebtoken')
const User = require('../models/User')

exports.protect = async (req,res,next)=>{
    let token
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token = req.headers.authorization.split(' ')[1]
    }else if (req.cookies && req.cookies.token){
        token = req.cookies.token
    }
    // Professor doesn't check cookie on request but check on headers
    if (!token || token == 'none'){
        return res.status(401).json({
            success: false,
            message: 'Not authorized to access this route'
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
            message: 'Not authorized to access this route'
        })
    }
}
exports.authorize = (...roles)=>{
    return (req, res, next)=>{
        if (!roles.includes(req.user.role)){ // can't use roles !== req.user.role because roles is an array
            res.status(403).json({
                success: false,
                message: `User role ${req.user.role} is not authorized to access this route`
            })
        }
        next()
    }
}