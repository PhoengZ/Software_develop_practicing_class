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
        disPatch(reset()); // start function reset
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
            <section className='heading'>
                <h1>
                    <FaUser/>Register
                </h1>
                <p>Please create an account</p>
            </section>
            <section className='form'>
                <form onSubmit={onSubmit}>
                    <div className='form-group'>
                        <input type="text" className='form-control' id='name' name='name' value={name} 
                        onChange={onChange} placeholder='Enter your name' required/>
                    </div>
                    <div className='form-group'>
                        <input type="email" className='form-control' id='email' name='email' value={email} 
                        onChange={onChange} placeholder='Enter your email' required/>
                    </div>
                    <div className='form-group'>
                        <input type="password" className='form-control' id='password' name='password' value={password} 
                        onChange={onChange} placeholder='Enter your password' required/>
                    </div>
                    <div className='form-group'>
                        <input type="password" className='form-control' id='password2' name='password2' value={password2} 
                        onChange={onChange} placeholder='Confirm your password' required/>
                    </div>
                    <div className='form-group'>
                        <input type="text" className='form-control' id='role' name='role' value={role} 
                        onChange={onChange} placeholder='Enter your role' required/>
                    </div>
                    <div className='form-group'>
                        <button className='btn btn-block'>
                            Submit
                        </button>
                    </div>
                </form>
            </section>
        </>
    )
}
export default Register