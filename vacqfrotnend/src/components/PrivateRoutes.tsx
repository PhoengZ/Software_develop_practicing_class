import { Navigate, Outlet } from "react-router-dom";

const privateRoute = ()=>{
    const isSuccess = localStorage.getItem("token")
    return isSuccess ? <Outlet /> : <Navigate to="/login" />;
}

export default privateRoute