import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import PageHeader from "../components/PageHeader";
import api from "../services/api";
import toast from "react-hot-toast";

function CreateReservation() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    reservationDate: "",
    timeSlot: "",
    guestCount: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post("/reservations", {
        reservationDate: form.reservationDate,
        timeSlot: form.timeSlot,
        guestCount: Number(form.guestCount),
      });

      toast.success("Reservation created successfully");

      navigate("/customer/reservations");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 py-8 md:py-10">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">

          <PageHeader
            title="Create Reservation"
            subtitle="Reserve a table in just a few steps. Select your preferred date, time, and number of guests."
          />

          <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 md:p-8">

            <form
              onSubmit={handleSubmit}
              className="space-y-6"
            >

              {/* Reservation Date */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Reservation Date
                </label>

                <input
                  type="date"
                  name="reservationDate"
                  value={form.reservationDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                  required
                />
              </div>

              {/* Time Slot */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Time Slot
                </label>

                <select
                  name="timeSlot"
                  value={form.timeSlot}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                  required
                >
                  <option value="">Select Time</option>
                  <option>6:00 PM</option>
                  <option>7:00 PM</option>
                  <option>8:00 PM</option>
                  <option>9:00 PM</option>
                </select>
              </div>

              {/* Guest Count */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Number of Guests
                </label>

                <input
                  type="number"
                  name="guestCount"
                  value={form.guestCount}
                  onChange={handleChange}
                  min="1"
                  max="8"
                  placeholder="Enter number of guests"
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition"
                  required
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-200 hover:shadow-lg"
              >
                Reserve Table
              </button>

            </form>

          </div>
        </div>
      </div>
    </>
  );
}

export default CreateReservation;