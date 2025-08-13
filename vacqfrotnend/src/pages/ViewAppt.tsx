import { useEffect, useState } from "react";
import hospitalServices from "../features/hospitalServices"
import appointmentServices from "../features/appointmentServices";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";

function ViewAppt(){
    type Appointment = {
        id: string,
        hospital:string,
        apptDate:Date,
        user:string
    }
    type Hospital = {
        id: string,
        name: string
    }
    const [Hospitals, setHospitals] = useState<Hospital[]>([])
    useEffect(()=>{
        async function getHospitals() {
            const response = await hospitalServices.getHospitals()
            const hospitalName = response.map((hospital: any)=>hospital.name)
            setHospitals(hospitalName)
        }
        getHospitals()
    },[])
    const [Page, setPage] = useState(1)
    const [limit, setLimit] = useState(25)
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        if (location.state?.openModal) {
            setIsModalOpen(true);
        }
    }, [location.state]);
    const [Appointments, setAppointments] = useState<Appointment[]>([])
    useEffect(()=>{
        const fetchData = async()=>{
            await handleGetAppointment(Page, limit)
        } 
        fetchData()
    },[])
    const handleAddAppointment = async(hid: string,payload: object)=>{
        try{
            const data = await appointmentServices.addMyAppt(hid,payload)
            setAppointments(prev=>[...prev,data])
            toast.success("Successful adding appointment")
        }catch(err: any){
            toast.error(err.response?.data?.message);
        }
        
    }
    const handleEditAppointment = async(aid: string, payload: object)=>{
        try{
            const response = await appointmentServices.editMyAppt(aid,payload)
            const updateApt = response.data?.data
            setAppointments(prev => [...prev, updateApt])
            toast.success(response.data?.success)
        }catch(err: any){
            toast.error(err.response?.data?.message);
        }
        
    }
    const handleDeleteAppointment = async(aid: string)=>{
        try{
            const response = await appointmentServices.delMyAppt(aid)
            toast.success("Successful delete appointment")
            const filterAppointment = Appointments.filter(appt => appt.id != aid)
            setAppointments(filterAppointment)
        }catch(err: any){
            toast.error(err.response?.data?.message)
        }
        
    }
    const handleGetAppointment = async(page: Number, limit: Number)=>{
        const data = await appointmentServices.getMyAppt(page,limit)
        setAppointments(data)
    }
    const handleClose = ()=>{setIsModalOpen(false)}
    return (
        <> 
            <section>
                <img src="/ChulaEngineeringLogorevised.png" alt="Logo" className=" w-6/12 h-6/12 mx-auto my-auto"/>
            </section>
            <section>
                <h1>Vaccination appointments</h1>
                <p>Example of CRUD made with Node.js, Express, MongoDB, and HandleBars</p>
            </section>
            <section>
                <table>
                    <thead>
                        <tr>
                            <th>appt Date</th>
                            <th>User</th>
                            <th>Hospital</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Appointments.map(appt=>(
                            <tr key={appt.id}>
                                <td>{appt.apptDate.toISOString()}</td>
                                <th>{appt.user}</th>
                                <th>{appt.hospital}</th>
                                <th>
                                    <button>Edit</button>
                                    <button>Remove</button>
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
            <section>
                {Page > 1 ? (
                    <button>Prev</button>
                ):(
                    <>
                    </>
                )}
                <button>Next</button>
            </section>
            <button> Add New</button>
        </>
    )
        
}

export default ViewAppt