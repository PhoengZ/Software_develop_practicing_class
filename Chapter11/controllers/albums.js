const Album = require('../models/Album')

exports.getAlbums = async(req,res,next)=>{
    Album.getAlbums((err,data)=>{
        if (err){
            res.status(500).json({
                success: false,
                message: err.message || `Some error occured while retrieving all albums`
            })
        }else{
            res.status(200).json({
                success: true,
                data: data
            })
        }
    })
}

exports.getAlbum = async (req, res, next)=>{
    Album.getAlbumById(req.params.id, (err, data)=>{
        if (err){
            if (err.message === 'not_found'){
                return res.status(404).json({
                    success: false,
                    message: `Not found album with the id ${req.params.id}`
                })
            }
            res.status(500).json({
                success: false,
                message: `Error retrieving album with the id ${id}`
            })
        }else{
            res.status(200).json({
                success: true,
                data: data
            })
        }
    })
}

exports.createAlbum = async (req,res,next)=>{
    if (!req.body){
        return res.status(400).json({
            success: false,
            message: 'Content cannot be empty'
        })
    }
    const album = new Album({
        title:req.body.title,
        artist: req.body.artist,
        price: req.body.price
    })
    Album.createAlbum(album, (err, data)=>{
        if (err){
            res.status(500).json({
                success: false,
                message: 'Some error occur while creating album'
            })
        }else{
            res.status(201).json({
                success: true,
                data: data
            })
        }
    })
}

exports.updateAlbum = async(req,res,next)=>{
    const id = req.params.id
    if (!req.body){
        return res.status(400).json({
            success: false,
            message: 'Content cannot be empty'
        })
    }
    const album = new Album(req.body)
    Album.updateById(id, album, (err, data)=>{
        if (err){
            if (err.message === 'not_found'){
                return res.status(404).json({
                    success: false,
                    message: `Not found album with the id ${id}`
                })
            }
            res.status(500).json({
                success: false,
                message: `Error updating album with id ${id}`
            })
        }else{
            res.status(200).json({
                success: true,
                data: data
            })
        }
    })
}

exports.deleteAlbum = async(req,res,next)=>{ 
    const id = req.params.id
    Album.deleteById(id, (err, data)=>{
        if (err){
            if (err.message === 'not_found'){
                return res.status(404).json({
                    success: false,
                    message: `Not found album with the id ${id}`
                })
            }
            res.status(500).json({
                success: false,
                message: `Error deleting album with id ${id}`
            })
        }else{
            res.status(200).json({
                success: true,
                data: {}
            })
        }
    })
}