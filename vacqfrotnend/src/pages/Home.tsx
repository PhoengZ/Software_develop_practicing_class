import { Link } from "react-router-dom";
import { FaQuestionCircle, FaTicketAlt } from "react-icons/fa";

function Home(){
    return (
        <>
            <section className='w-screen min-h-full h-screen flex justify-center items-center flex-col gap-5 px-5 sm:px-10 lg:px-20 box-border'>
                <h1 className=" font-bold text-2xl text-center sm:text-4xl lg:text-6xl">
                    Vac Q: A Vaccine Booking System
                </h1>
                <p className=" font-bold text-xl text-gray-600 mt-2 sm:mt-4 lg:mt-6 text-center sm:text-2xl lg:text-4xl">
                    Please choose from option below
                </p>
                <Link to='/appointments' state={{openModal:true}} className=" border-2 rounded-2xl w-full text-center py-3 text-sm sm:text-xl lg:text-2xl transition duration-300 ease-in-out hover:bg-gray-200">
                    <FaQuestionCircle className=" inline-block"/> Create New Appointment
                </Link>
                <Link to='/appointments' className="border-2 rounded-2xl border-gray-500 bg-black w-full text-center text-white py-3 text-sm sm:text-xl lg:text-2xl transition duration-300 ease-in-out hover:bg-gray-800">
                    <FaTicketAlt className=" inline-block"/> View My Appointment
                </Link>
            </section>
        </>
    )
}   

export default Home