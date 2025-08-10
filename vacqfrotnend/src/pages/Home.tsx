import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

function Home(){
    return (
        <>
            <section className=' w-screen h-full flex justify-center items-center flex-col gap-5'>
                <h1>
                    Vac Q: A Vaccine Booking System
                </h1>
                <p>
                    Please choose from option below
                </p>
                <Link to='/new-ticket' className="btn btn-reverse btn-block">
                    <FaQuestionCircle/>Create New Appointment
                </Link>
                <Link to='/tickets' className="btn btn-block">
                    <FaTicketAlt/>View My Appointment
                </Link>
            </section>
        </>
    )
}   

export default Home