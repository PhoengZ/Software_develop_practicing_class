const express = require('express')
const {getHospitals, getHospitalsById, createHospital, updateHospital, deleteHospital} = require('../controllers/hospitals')

const router = express.Router()

router.route('/').get(getHospitals).post(createHospital)
router.route('/:id').get(getHospitalsById).put(updateHospital).delete(deleteHospital)


module.exports = router
