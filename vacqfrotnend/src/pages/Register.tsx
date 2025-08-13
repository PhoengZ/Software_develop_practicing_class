import { useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import {useSelector, useDispatch} from 'react-redux'
import { register, reset } from '../features/auth/authSlice'
import type { RootState, AppDispatch} from '../app/store'

function Register(){
    const [formData, setFormData]=useState({
        name:'',
        email:'',
        password:'',
        password2:'',
        role:'user'
    })
    const {name,email,password,password2,role} = formData
    const disPatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const {user, isLoading, isSuccess, isError, message} = useSelector((state: RootState)=>{
        return state.auth
    })

    useEffect(()=>{
        if (isError){
            toast.error(message)
        }
        if (isSuccess || user){
            navigate('/')
        }
        disPatch(reset()); // start function reset and trigger redux with dispatch correspond function
    },[isError, isSuccess, user, message, navigate, disPatch])

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setFormData((prevstate)=>({
            ...prevstate,
            [e.target.name]: e.target.value
        }))
    }
    const onSubmit = (e: React.FormEvent<HTMLFormElement>)=>{
        e.preventDefault()
        if (password !== password2){
            toast.error('Password do not match')
        }else{
            const userData = {
                name,
                email,
                password,
                role
            }
            disPatch(register(userData))
        }
    }
    return (
        <>
            <section className=' mt-5 sm:mt-10 lg:mt-20 flex flex-col gap-5'>
                <h1 className='text-center font-bold  text-3xl sm:text-4xl lg:text-6xl'>
                    <FaUser className='inline-block'/>Register
                </h1>
                <p className=" text-center text-gray-500 font-bold text-2xl sm:text-3xl lg:text-4xl">Please create an account</p>
            </section>
            <section className=" px-1 sm:px-10 lg:px-20 mt-10 w-8/12 mx-auto">
                <form onSubmit={onSubmit} className="w-full flex justify-center items-center flex-col gap-5">
                    <div className="w-full">
                        <input type="text" className="w-full border-2 rounded-md px-2 py-2 shadow-md" id='name' name='name' value={name} 
                        onChange={onChange} placeholder='Enter your name' required/>
                    </div>
                    <div className='w-full'>
                        <input type="email" className="w-full border-2 rounded-md px-2 py-2 shadow-md" id='email' name='email' value={email} 
                        onChange={onChange} placeholder='Enter your email' required/>
                    </div>
                    <div className='w-full'>
                        <input type="password" className="w-full border-2 rounded-md px-2 py-2 shadow-md" id='password' name='password' value={password} 
                        onChange={onChange} placeholder='Enter your password' required/>
                    </div>
                    <div className='w-full'>
                        <input type="password" className="w-full border-2 rounded-md px-2 py-2 shadow-md" name='password2' value={password2} 
                        onChange={onChange} placeholder='Confirm your password' required/>
                    </div>
                    <div className='w-full'>
                        <input type="text" className="w-full border-2 rounded-md px-2 py-2 shadow-md" id='role' name='role' value={role} 
                        onChange={onChange} placeholder='Enter your role' required/>
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
export default Register