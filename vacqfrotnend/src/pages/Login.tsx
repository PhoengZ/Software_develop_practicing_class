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
            <section className="flex flex-col gap-5 mt-20">
                <h1 className=" text-center font-bold  text-3xl sm:text-4xl lg:text-6xl">
                    <FaSignInAlt className=" inline-block"/> Login
                </h1>
                <p className=" text-center text-gray-500 font-bold text-2xl sm:text-3xl lg:text-4xl">Please login to get support</p>
            </section>
            <section className=" px-1 sm:px-10 lg:px-20 mt-10 w-8/12 mx-auto">
                <form onSubmit={onSubmit} className="w-full flex justify-center items-center flex-col gap-5">
                    <div className="w-full">
                        <input type="text" className="w-full border-2 rounded-md px-2 py-2 shadow-md" name="email" id="email" value={email} onChange={onChange}
                        placeholder="Enter your email" required/>
                    </div>
                    <div className="w-full">
                        <input type="password" className="w-full border-2 rounded-md px-2 py-2 shadow-md" name="password" id="password" value={password}
                        onChange={onChange} placeholder="Enter your password" required/>
                    </div>
                    <div className='w-full'>
                        <button className='w-full border-2 rounded-md px-2 py-2 shadow-md bg-black text-white border-white
                         transition duration-300 ease-in-out hover:bg-gray-800'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}
export default Login