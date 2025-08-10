import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

function Home(){
    return (
        <>
            <section className='w-screen min-h-full h-screen flex justify-center items-center flex-col gap-5 px-5 sm:px-10 lg:px-20 box-border'>
                <h1 className=" font-bold text-6xl">
                    Vac Q: A Vaccine Booking System
                </h1>
                <p className=" font-bold text-4xl text-gray-600 mt-10">
                    Please choose from option below
                </p>
                <Link to='/new-ticket' className=" border-2 rounded-2xl w-full text-center py-3">
                    <FaQuestionCircle className=" inline-block"/> Create New Appointment
                </Link>
                <Link to='/tickets' className="border-2 rounded-2xl border-gray-500 bg-black w-full text-center text-white py-3">
                    <FaTicketAlt className=" inline-block"/> View My Appointment
                </Link>
            </section>
        </>
    )
}   

export default Home