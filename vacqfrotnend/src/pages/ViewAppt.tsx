import { useEffect, useState } from "react";
import appointmentServices from "../features/appointmentServices";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import CreatingForm from "../components/CreatingForm";
import type { Appointment } from "../models/model";

function ViewAppt() {
  const [Page, setPage] = useState(1);
  const [limit, setLimit] = useState(25);
  const location = useLocation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAppointment, setEditingAppointment] =
    useState<Appointment | null>(null);
  useEffect(() => {
    if (location.state?.openModal) {
      setIsModalOpen(true);
    }
  }, [location.state]);
  const [Appointments, setAppointments] = useState<Appointment[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      await handleGetAppointment(Page, limit);
    };
    fetchData();
  }, [Page, limit]);
  const handleAddAppointment = async (hid: string, payload: object) => {
    try {
      let response = await appointmentServices.addMyAppt(hid, payload);
      response = {
        ...response,
        apptDate: new Date(response.apptDate),
        id: response._id,
      };
      console.log(response);
      setAppointments((prev) => [...prev, response]);
      handleCloseModal();
      toast.success("Successful adding appointment");
    } catch (err: any) {
      toast.error(err.response?.data?.message);
    }
  };
  const handleEditAppointment = async (aid: string, payload: object) => {
    try {
      let response = await appointmentServices.editMyAppt(aid, payload);
      console.log(response);
      const updatedAppt = {
        ...response,
        apptDate: new Date(response.apptDate),
        id: response._id,
      };
      let newAppointment = Appointments.filter((appt:any)=>appt.id != response._id)
      newAppointment.push(updatedAppt)
      setAppointments(newAppointment);
      handleCloseModal();
      toast.success("Successful editing appointment");
    } catch (err: any) {
      toast.error(err.response?.data?.message);
    }
  };
  const handleDeleteAppointment = async (aid: string) => {
    try {
      const response = await appointmentServices.delMyAppt(aid);
      toast.success("Successful delete appointment");
      const filterAppointment = Appointments.filter((appt) => appt.id != aid);
      setAppointments(filterAppointment);
    } catch (err: any) {
      toast.error(err.response?.data?.message);
    }
  };
  const handleGetAppointment = async (page: Number, limit: Number) => {
    const data = await appointmentServices.getMyAppt(page, limit);
    const formatted = data.map((appt: any) => ({
      ...appt,
      apptDate: new Date(appt.apptDate),
      id: appt._id,
    }));
    setAppointments(formatted);
  };
  const handleOpenEditModal = (appt: Appointment) => {
    setEditingAppointment(appt);
    setIsModalOpen(true);
  };

  const handleOpenAddModal = () => {
    setEditingAppointment(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingAppointment(null);
  };
  const handleNext = () => {
    setPage(Page + 1);
  };
  const handlePrev = () => {
    setPage(Page - 1);
  };
  return (
    <section className="relative min-h-screen">
      <section>
        <img
          src="/ChulaEngineeringLogorevised.png"
          alt="Logo"
          className=" w-full h-full lg:w-6/12 lg:h-6/12 mx-auto my-auto"
        />
      </section>
      <section className="w-full h-full relative p-2 sm:p-4 lg:p-8">
        <section className=" flex flex-col justify-center items-center gap-4 sm:gap-8 lg:gap-16">
          <h1 className=" text-xl sm:text-2xl lg:text-4xl font-bold text-center">
            Vaccination appointments
          </h1>
          <p className="text-sm sm:text-xl lg:text-2xl font-light text-center text-gray-700">
            Example of CRUD made with Node.js, Express, MongoDB, and HandleBars
          </p>
        </section>
        <section className="mt-5 sm:mt-10 lg:mt-20 px-5 sm:px-10 lg:px-20">
          <table className="w-full h-fit">
            <thead className=" border-b-2 border-t-2 border-gray-400 py-10">
              <tr>
                <th className="py-2 font-bold text-center">appt Date</th>
                <th className="py-2 font-bold text-center">User</th>
                <th className="py-2 font-bold text-center">Hospital</th>
                <th className="py-2 font-bold text-center">Action</th>
              </tr>
            </thead>
            <tbody className=" border-b-2 border-t-2 border-gray-200 py-10">
              {Appointments.map((appt) => (
                <tr key={appt.id}>
                  <td className="py-2 font-bold text-center">
                    {appt.apptDate.toLocaleDateString()}
                  </td>
                  <td className="py-2 font-bold text-center">{appt.user}</td>
                  <td className="py-2 font-bold text-center">
                    {appt.hospital.name}
                  </td>
                  <td className="py-2 font-bold text-center flex justify-center">
                    <button
                      onClick={() => handleOpenEditModal(appt)}
                      className=" border-2 rounded-sm text-white bg-blue-600 text-center p-2 text-base transition duration-200 ease-in-out hover:bg-blue-400"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteAppointment(appt.id)}
                      className=" border-2 rounded-sm text-white bg-red-600 text-center p-2 text-base transition duration-200 ease-in-out hover:bg-red-400"
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section className="flex justify-center gap-5 sm:gap-10 lg:gap-20 mt-3 sm:mt-5 lg:mt-10">
          {Page > 1 ? (
            <button
              onClick={handlePrev}
              className=" border-2 rounded-sm border-gray-600 text-center p-2 text-base transition duration-200 ease-in-out hover:bg-gray-400"
            >
              Prev
            </button>
          ) : (
            <></>
          )}
          <button
            onClick={handleNext}
            className=" border-2 rounded-sm text-white bg-black text-center p-2 text-base transition duration-200 ease-in-out hover:bg-gray-600"
          >
            Next
          </button>
        </section>
        <button
          onClick={() => handleOpenAddModal()}
          className=" absolute bottom-[-50px] right-4 border-2 rounded-sm text-white bg-green-600 text-center p-2 text-base transition duration-200 ease-in-out hover:bg-green-400"
        >
          Add New
        </button>
        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 bg-[rgba(0,0,0,0.5)]">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full relative">
              <button
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={handleCloseModal}
              >
                Close
              </button>
              <CreatingForm
                isUpdate={!!editingAppointment}
                oldDate={editingAppointment?.apptDate || new Date()}
                hospital={editingAppointment?.hospital.name || ""}
                onAdd={handleAddAppointment}
                onEdit={handleEditAppointment}
                appointmentId={editingAppointment?.id}
              />
            </div>
          </div>
        )}
      </section>
    </section>
  );
}

export default ViewAppt;
