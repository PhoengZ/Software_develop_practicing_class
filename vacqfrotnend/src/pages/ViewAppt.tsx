import { useEffect, useState } from "react";
import hospitalServices from "../features/hospitalServices"


function ViewAppt(){
    const [Hospitals, setHospitals] = useState([])
    useEffect(()=>{
        async function getHospitals() {
            const response = await hospitalServices.getHospitals()
            setHospitals(response.data?.data)
            console.log(Hospitals);
        }
        getHospitals()
    },[])
    return (
        <>
            <h1>Test</h1>
        </>
    )
        
}

export default ViewAppt