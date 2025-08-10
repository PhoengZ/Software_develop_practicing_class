import { useEffect, useState } from "react";
import {toast} from 'react-toastify'
import { FaSignInAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { login, reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
function Login(){
    const [formData, setFormData] = useState({
        email:'',
        password:''
    })
    const disPatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const {user, isLoading, isError, isSuccess, message} = useSelector((state: RootState)=>{
        return state.auth
    })
    useEffect(()=>{
        if (isError){
            toast.error(message)
        }
        if (isSuccess || user){
            navigate('/')
        }
        disPatch(reset())
    },[isError, isSuccess, user, message, navigate, disPatch ])
    const {email,password}= formData
    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setFormData((prevstate)=>({
            ...prevstate,
            [e.target.name]:e.target.value
        }))
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault() // protect webpage refresh itself
        const userData = {
            email,
            password
        }
        disPatch(login(userData))
    }
    return (
        <>
            <section className="heading">
                <h1>
                    <FaSignInAlt/> Login
                </h1>
                <p>Please login to get support</p>
            </section>
            <section className="form">
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <input type="text" className="form-control" name="email" id="email" value={email} onChange={onChange}
                        placeholder="Enter your email" required/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" name="password" id="password" value={password}
                        onChange={onChange} placeholder="Enter your password" required/>
                    </div>
                </form>
            </section>
        </>
    )
}
export default Login