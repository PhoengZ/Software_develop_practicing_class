const express = require('express')
const {getAlbums, createAlbum, getAlbum, updateAlbum, deleteAlbum} = require('../controllers/albums')

const router = express.Router()


router.route('/').get(getAlbums).post(createAlbum)
router.route('/:id').get(getAlbum).put(updateAlbum).delete(deleteAlbum)

module.exports = router