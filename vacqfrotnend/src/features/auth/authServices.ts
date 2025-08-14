import axios from 'axios'

const API_URL = 'http://localhost:5000/api/v1/auth/'


const register = async(userData: object)=>{
    try{
        const response = await axios.post(API_URL+'register',userData)
        console.log(JSON.stringify(response.data));
        console.log(response.data.name);
        if (response.data){
            localStorage.setItem('user',response.data.name)
            localStorage.setItem('token',response.data.token)
            localStorage.setItem('id',response.data?._id)
        }
        return response.data
    }catch(err){
        console.error('AuthServices register:');
        console.error(err);
        throw err;
    }
}

const login = async(userData: object)=>{
    const response = await axios.post(API_URL+'login',userData)
    console.log(JSON.stringify(response.data));
    if (response){
        localStorage.setItem('user',response.data?.name)
        localStorage.setItem('token',response.data.token)
        localStorage.setItem('id',response.data?._id)
    }
    console.log(response.data);
    return response.data
}

const logout = async()=>{
    try{
        await axios.get(API_URL + 'logout')
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        localStorage.removeItem('id')
    }catch(err){
        console.error('Authservices logot: ');
        console.error(err);
        throw(err)
    }
}

const authServices = {
    register,
    login,
    logout,
}
export default authServices