import axios from "axios"

const API_URL = 'http://localhost:5000/api/v1/'

const getMyAppt = async(page: Number, limit: Number)=>{
    try{
        const response = await axios.get(API_URL + `appointments?page=${page}&limit=${limit}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
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
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
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
        const response = await axios.put(API_URL + `appointments/${aid}`,payload,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
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
        const response = await axios.delete(API_URL + `appointments/${aid}`,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
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