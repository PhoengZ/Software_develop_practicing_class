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
        <header className="w-screen sticky top-0 z-50 shadow-md px-4 sm:px-6 lg:px-8 box-border">
            <div className=" flex justify-between items-center">
                <div className=" font-bold text-gray-700 text-base lg:text-2xl">
                    <Link to='/'>Support desk</Link>
                </div>
                <ul className="flex flex-row gap-2 sm:gap-4 lg:gap-6 py-2 sm:py-3 lg:py-4">
                    {user?(
                        <li>
                            <button className="relative w-fit h-fit text-black text-sm sm:text-base lg:text-xl cursor-pointe py-1
                            transition duration-200 ease-in-out group" onClick={onLogout}>
                                <FaSignOutAlt className=" inline-block"/> Logout
                                <span className=" absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out "></span>
                            </button>
                        </li>
                    ):(
                        // use this element because : syntax have 1 element but below return two element thus have to use <>
                        <> 
                            <li className="relative w-fit h-fit text-black text-sm sm:text-base lg:text-xl cursor-pointer py-1
                            transition duration-200 ease-in-out group">
                                <Link to='/login'>
                                    <FaSignInAlt className=" inline-block"/> Login
                                    <span className=" absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out "></span>
                                </Link>
                            </li>
                            <li className="relative w-fit h-fit text-black text-sm sm:text-base lg:text-xl cursor-pointer py-1
                            transition duration-200 ease-in-out group">
                                <Link to='/register'>
                                    <FaSignOutAlt className=" inline-block"/> Register
                                    <span className=" absolute bottom-0 left-0 w-full h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out "></span>
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