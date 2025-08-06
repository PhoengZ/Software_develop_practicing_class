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
    const newHospital = req.body
    res.status(201).json({
        success: true,
        msg: `Create a new Hospital with ${JSON.stringify(newHospital)}`
    })
}

exports.updateHospital = (req,res,next)=>{
    const id = req.params.id, data = req.body
    res.status(200).json({
        success: true,
        msg: `Update hospital with id : ${id} with data : ${JSON.stringify(data)}`
    })
}

exports.deleteHospital = (req,res,next)=>{
    res.status(200).json({
        success: true,
        msg: `Delete hospital with id : ${req.params.id}`
    })
}