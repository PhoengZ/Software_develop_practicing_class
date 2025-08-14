exports.getHospitals = (req,res,next)=>{
    res.status(200).json({
        success: true,
        msg : 'Show all hospitals'
    })
}

exports.getHospitalsById = (req,res,next)=>{
    res.status(200).json({
        success:true,
        msg: `Show hospital with id : ${req.params.id}`
    })
}

exports.createHospital = (req,res,next)=>{
    res.status(201).json({
        success: true,
        msg: `Create a new Hospital }`
    })
}

exports.updateHospital = (req,res,next)=>{
    const id = req.params.id
    res.status(200).json({
        success: true,
        msg: `Update hospital with id : ${id}`
    })
}

exports.deleteHospital = (req,res,next)=>{
    res.status(200).json({
        success: true,
        msg: `Delete hospital with id : ${req.params.id}`
    })
}