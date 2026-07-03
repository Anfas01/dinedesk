import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import api from "../services/api";
import toast from "react-hot-toast";
import StatusBadge from "../components/StatusBadge";
import PageHeader from "../components/PageHeader";

function AdminDashboard() {
  const [reservations, setReservations] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);
  const [formData, setFormData] = useState({
    reservationDate: "",
    timeSlot: "",
    guestCount: 1,
  });

  const fetchReservations = async () => {
    try {
      let res;

      if (selectedDate) {
        res = await api.get(`/reservations/date/${selectedDate}`);
      } else {
        res = await api.get("/reservations");
      }

      setReservations(res.data);
    } catch (error) {
      toast.error("Failed to load reservations");
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [selectedDate]);

  const total = reservations.length;

  const booked = reservations.filter(
    (r) => r.status === "Booked"
  ).length;

  const cancelled = reservations.filter(
    (r) => r.status === "Cancelled"
  ).length;

  const adminCancel = async (id) => {
    const confirmCancel = window.confirm(
      "Cancel this reservation?"
    );

    if (!confirmCancel) return;

    try {
      await api.patch(`/reservations/admin/${id}/cancel`);

      toast.success("Reservation cancelled");

      fetchReservations();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to cancel reservation"
      );
    }
  };

  const filteredReservations = reservations.filter((reservation) =>
    reservation.user?.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handleEdit = (reservation) => {
    setSelectedReservation(reservation);

    setFormData({
      reservationDate: reservation.reservationDate.split("T")[0],
      timeSlot: reservation.timeSlot,
      guestCount: reservation.guestCount,
    });

    setShowModal(true);
  };

  const saveChanges = async () => {
    try {
      await api.put(
        `/reservations/${selectedReservation._id}`,
        formData
      );

      toast.success("Reservation updated successfully.");

      setShowModal(false);

      fetchReservations();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        "Failed to update reservation."
      );
    }
  };

  return (
    <Layout>
      <PageHeader
        title="Admin Dashboard"
        subtitle="Monitor, search, update, and manage all restaurant reservations."
      />

      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <DashboardCard
          title="Total Reservations"
          value={total}
          color="#3B82F6"
        />

        <DashboardCard
          title="Booked"
          value={booked}
          color="#22C55E"
        />

        <DashboardCard
          title="Cancelled"
          value={cancelled}
          color="#EF4444"
        />
      </div>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-4 md:items-end">

          {/* Search */}
          <div className="flex-1">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Search Customer
            </label>

            <input
              type="text"
              placeholder="Search by customer name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Filter by Date
            </label>

            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="rounded-xl border border-slate-300 px-4 py-3 focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
            />
          </div>

          {/* Clear Button */}
          <button
            onClick={() => setSelectedDate("")}
            className="bg-slate-700 hover:bg-slate-800 text-white px-6 py-3 rounded-xl font-medium transition"
          >
            Clear
          </button>

        </div>
      </div>

      <p className="text-gray-600 mb-4">
        Showing <span className="font-semibold">{filteredReservations.length}</span> reservations
      </p>

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-x-auto">

        <table className="min-w-full">

          <thead className="bg-slate-900 text-white uppercase text-xs tracking-wider">

            <tr>

              <th className="px-6 py-4 text-left font-semibold">
                Customer
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Table
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Date
              </th>

              <th className="p-4 text-left">
                Time
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Guests
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Status
              </th>

              <th className="px-6 py-4 text-left font-semibold">
                Actions
              </th>

            </tr>

          </thead>

          <tbody>
            {filteredReservations.length === 0 ? (
              <tr>
                <td
                  colSpan="7"
                  className="text-center py-8 text-gray-500"
                >
                  No reservations found.
                </td>
              </tr>
            ) : (
              filteredReservations.map((reservation) => (
                <tr
                  key={reservation._id}
                  className="border-b"
                >
                  <td className="p-4">
                    {reservation.user?.name}
                  </td>

                  <td className="p-4">
                    {reservation.table?.tableNumber}
                  </td>

                  <td className="p-4">
                    {new Date(
                      reservation.reservationDate
                    ).toLocaleDateString()}
                  </td>

                  <td className="p-4">
                    {reservation.timeSlot}
                  </td>

                  <td className="p-4">
                    {reservation.guestCount}
                  </td>

                  <td className="p-4">
                    <StatusBadge status={reservation.status} />
                  </td>

                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(reservation)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                      >
                        Edit
                      </button>

                      {reservation.status === "Booked" && (
                        <button
                          onClick={() => adminCancel(reservation._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>

        </table>

      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">

            <h2 className="text-2xl font-bold mb-6">
              Edit Reservation
            </h2>

            <input
              type="date"
              value={formData.reservationDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  reservationDate: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 mb-4"
            />

            <input
              type="text"
              value={formData.timeSlot}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  timeSlot: e.target.value,
                })
              }
              className="w-full border rounded-lg p-3 mb-4"
              placeholder="Time Slot"
            />

            <input
              type="number"
              value={formData.guestCount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  guestCount: Number(e.target.value),
                })
              }
              className="w-full border rounded-lg p-3 mb-6"
              min="1"
            />

            <div className="flex justify-end gap-3">

              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
              >
                Cancel
              </button>

              <button
                onClick={saveChanges}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Save Changes
              </button>

            </div>

          </div>
        </div>
      )}
    </Layout>
  );
}

export default AdminDashboard;