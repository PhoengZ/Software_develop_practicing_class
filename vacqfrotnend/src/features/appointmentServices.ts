import axios from "axios"

const API_URL = 'http://localhost:5000/api/v1/'

const getMyAppt = async(page: string, limit: string)=>{
    try{
        const response = await axios.get(API_URL + 'appointments',{
            withCredentials: true
        })
        return response.data?.data
    }catch(err){
        console.error("Authorization getMyAppointment:");
        console.error(err);
        throw err
    }
}

const addMyAppt = async(hid: string,payload: object)=>{
    try{
        const response = await axios.post(API_URL + `hospitals/${hid}/appointments`,payload,{
            withCredentials: true
        })
        return response.data?.data
    }catch(err){
        console.error("Authorization addMyAppointment:");
        console.error(err);
        throw err
    }
}

const editMyAppt = async(aid: string, payload: object)=>{
    try{
        const response = await axios.post(API_URL + `appointments/${aid}`,payload,{
            withCredentials: true
        })
        return response.data?.data
    }catch(err){
        console.error("Authorization editMyAppointment:");
        console.error(err);
        throw err
    }
}

const delMyAppt = async(aid: string)=>{
    try{
        const response = await axios.post(API_URL + `appointments/${aid}`,{
            withCredentials: true
        })
        return response.data?.success
    }catch(err){
        console.error("Authorization deleteMyAppointment:");
        console.error(err);
        throw err
    }
}

const appointmentServices = {
    getMyAppt,
    addMyAppt,
    editMyAppt,
    delMyAppt
}

export default appointmentServices