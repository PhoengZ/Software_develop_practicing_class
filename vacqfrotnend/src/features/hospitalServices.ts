import axios from "axios"

const API_URL = 'http://localhost:5000/api/v1/'

const getHospitals = async()=>{
    try{
        const response = await axios.get(API_URL+'hospitals')
        return response.data?.data
    }catch(err){
        console.error("Hospitals services:");
        console.error(err);
        throw(err)
    }
}

const hospitalServices = {
    getHospitals
}
export default hospitalServices