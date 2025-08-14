import { useState, useEffect } from "react";
import type { Hospital } from "../models/model";
import hospitalServices from "../features/hospitalServices";
import { toast } from "react-toastify";

type CreatingFormProp = {
  isUpdate: Boolean;
  oldDate: Date;
  hospital: string;
  onAdd?: (hid: string, payload: { user: string; apptDate: Date }) => void;
  onEdit?: (
    appointmentId: string,
    payload: { hospital: string; apptDate: Date }
  ) => void;
  appointmentId?: string;
};

function CreatingForm({
  isUpdate,
  oldDate,
  hospital,
  onAdd,
  onEdit,
  appointmentId,
}: CreatingFormProp) {
  const [showList, setShowList] = useState(false)
  const [hospitalInput, setHospitalInput] = useState(hospital || "");
  const [Hospitals, setHospitals] = useState<Hospital[]>([]);
  const [selectedHospital, setSelectedHospital] = useState<Hospital>();
  const [selectedDate, setSelectedDate] = useState<Date>(oldDate);
  useEffect(() => {
    async function getHospitals() {
      const response = await hospitalServices.getHospitals();
      setHospitals(response);
    }
    getHospitals();
  }, []);

  useEffect(() => {
    if (isUpdate && Hospitals.length > 0 && !selectedHospital) {
      const initialHos = Hospitals.find((h) => h.name === hospital);
      if (initialHos) {
        setSelectedHospital(initialHos);
      }
    }
  }, [Hospitals, isUpdate, hospital]);

  const onChangeDate = (date: string) => {
    const newDate = new Date(date);
    setSelectedDate(newDate);
  };

  const onChangeHospital = (hname: string) => {
    setHospitalInput(hname);
    const hos = Hospitals.find((hos) => hos.name === hname);
    if (hos) {
      setSelectedHospital(hos);
    } else {
      setSelectedHospital(undefined);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedHospital) {
      toast.error("Hospital not selected");
      return;
    }
    const userId = localStorage.getItem("id");
    if (!userId) {
      toast.error("User ID not found in local storage.");
      return;
    }
    const payloadAddItem = {
      user: userId,
      apptDate: selectedDate,
    };
    console.log(selectedHospital.id);
    const payloadEditItem = {
      hospital: selectedHospital.id,
      apptDate: selectedDate,
    };
    if (isUpdate && onEdit && appointmentId) {
      onEdit(appointmentId, payloadEditItem);
    } else if (!isUpdate && onAdd) {
      onAdd(selectedHospital.id, payloadAddItem);
    }
  };

  return (
    <section className="max-w-md mx-auto bg-white shadow-md rounded-xl p-6 mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        {isUpdate ? "Edit Appointment" : "Add Appointment"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Select Date
          </label>
          <input
            type="date"
            value={selectedDate.toISOString().split("T")[0]}
            onChange={(e) => onChangeDate(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-medium mb-1">
            Select Hospital
          </label>
          <div className="relative">
            <input
              type="text"
              value={hospitalInput}
              onChange={(e) => onChangeHospital(e.target.value)}
              placeholder="Select hospital"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:border-blue-500"
              onFocus={() => setShowList(true)}
              onBlur={() => setTimeout(() => setShowList(false), 100)}
            />
            {showList && (
              <ul className="absolute z-10 w-full max-h-40 overflow-y-auto bg-white border border-gray-300 rounded-lg mt-1 shadow-lg">
                {Hospitals.filter((h) =>
                  h.name.toLowerCase().includes(hospitalInput.toLowerCase())
                ).map((h) => (
                  <li
                    key={h.id}
                    className="px-3 py-2 hover:bg-blue-500 hover:text-white cursor-pointer"
                    onMouseDown={() => {
                      setHospitalInput(h.name);
                      setSelectedHospital(h);
                    }}
                  >
                    {h.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-lg text-white font-medium transition-colors duration-200 ${
              isUpdate
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {isUpdate ? "Update" : "Add"}
          </button>
        </div>
      </form>
    </section>
  );
}

export default CreatingForm;
