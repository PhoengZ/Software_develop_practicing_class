import { useState,useEffect } from "react"
import type { Hospital } from "../models/model"
import hospitalServices from "../features/hospitalServices"

type CreatingFormProp = {
    isUpdate:Boolean,
    Date: Date,
    hospital: string
}

function CreatingForm({isUpdate,  Date, hospital }: CreatingFormProp){
    const [Hospitals, setHospitals] = useState<Hospital[]>([])
    useEffect(()=>{
        async function getHospitals() {
            const response = await hospitalServices.getHospitals()
            const hospitalName = response.map((hospital: any)=>hospital.name)
            setHospitals(hospitalName)
        }
        getHospitals()
    },[])
    const [selectedHospital, setSelectedHospital] = useState(hospital)
    const [selectedDate, setSelectedDate] = useState(Date.toISOString().split("T")[0]) // change form to yyyy-mmm-ddd
    const onChangeDate = (date: string){

    }
    const onChangeHospital = (hid: string){

    }
    return (
        <section>
            <h2>{isUpdate ? "Edit Appointment": "Add Appointment"}</h2>
            <div>
                <div>
                    <input type="date" value={selectedDate} onChange={(e)=>onChangeDate(e.target.value)}/>
                </div>
                <div>
                    <input list="hospital" value={selectedHospital} onChange={(e)=>onChangeHospital(e.target.value)}/>
                    <datalist id="hospital">
                        {Hospitals.map((hospital)=>(
                            <option value={hospital.name} key={hospital.id}></option>
                        ))}
                    </datalist>
                </div>
            </div>
        </section>
    )
}

export default CreatingForm