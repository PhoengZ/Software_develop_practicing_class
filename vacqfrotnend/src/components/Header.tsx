import { FaSignInAlt, FaSignOutAlt,  } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "../app/store";
import { logout, reset } from "../features/auth/authSlice";
function Header(){
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()
    const {user} = useSelector((state: RootState)=>{
        return state.auth
    })
    const onLogout = ()=>{
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }
    return (
        <header className=" w-screen bg-blue-400 sticky top-0 z-50 shadow-md px-4 sm:px-6 lg:px-8">
            <div className=" flex justify-between items-center">
                <div className=" font-bold text-2xl text-gray-700">
                    <Link to='/'>Support desk</Link>
                </div>
                <ul className="flex flex-row gap-2 sm:gap-4 lg:gap-6 py-2 sm:py-3 lg:py-4">
                    {user?(
                        <li>
                            <button className=" w-fit h-fit border-2 border-gray-700 text-black" onClick={onLogout}>
                                <FaSignOutAlt/>
                            </button>
                        </li>
                    ):(
                        // use this element because : syntax have 1 element but below return two element thus have to use <>
                        <> 
                            <li>
                                <Link to='/login'>
                                    <FaSignInAlt/> Login
                                </Link>
                            </li>
                            <li>
                                <Link to='/register'>
                                    <FaSignOutAlt/> Register
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
            
        </header>
    )
}

export default Header