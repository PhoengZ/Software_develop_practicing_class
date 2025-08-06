const Hospital = require("../models/Hospital")

exports.getHospitals = async (req,res,next)=>{
    try{
        const hospitals = await Hospital.find()
        res.status(200).json({success:true, data: hospitals})
    }catch(e){
        res.status(400).json({
            success: false,
            msg: e.message || 'Unknown error occurred while fetching hospitals'
        })
    }
}

exports.getHospitalsById = async (req,res,next)=>{
    const id = req.params.id
    try{
        const hospital = await Hospital.findById(id)
        if (!hospital){
            res.status(404).json({
                success: false,
                msg: `Hospital with id: ${id} not found`
            })
        }
        res.status(200).json({
            success: true,
            data: hospital
        })
    }catch(e){
        res.status(400).json({
            success:false,
            msg: e.message || 'Unknown error occured while fecthing'
        })
    }
}

exports.createHospital = async(req,res,next)=>{
    try{
        const payload = new Hospital(req.body)
        const hospital = await Hospital.create(payload)
        res.status(201).json({
            success: true,
            data: hospital
        })
    }catch(e){
        res.status(400).json({
            success: false,
            msg: e.message || 'Unknown error occurred while creating hospital'
        })
    }
}

exports.updateHospital = async(req,res,next)=>{
    const id = req.params.id
    try{
        const hospital = await Hospital.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true
        })
        if (!hospital){
            res.status(404).json({
                success: false,
                msg: `Hospital with id: ${id} not found`
            })
        }
        res.status(200).json({
            success: true,
            data:hospital
        })
    }catch(e){
        res.status(400).json({
            success: false,
            msg: e.message || 'Unknown error occurred while updating hospital'
        })
    }
    
}

exports.deleteHospital = async(req,res,next)=>{
    const id = req.params.id
    try{
        const hospital = await Hospital.findByIdAndDelete(id)
        if (!hospital){
            res.status(404).json({
                success: false,
                msg: `Hospital with id: ${id} not found`
            })
        }
        res.status(200).json({
            success: true,
            data: {}
        })
    }catch(e){
        res.status(400).json({
            success: false,
            msg: e.message || 'Unknown error occurred while deleting hospital'
        })
    }
}