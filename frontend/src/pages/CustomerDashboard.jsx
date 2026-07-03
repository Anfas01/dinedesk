import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import DashboardCard from "../components/DashboardCard";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import StatusBadge from "../components/StatusBadge";
import Loader from "../components/Loader";

function CustomerDashboard() {
  const { user } = useAuth();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReservations = async () => {
    try {
      setLoading(true);

      const res = await api.get("/reservations/my");

      setReservations(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const total = reservations.length;

  const booked = reservations.filter(
    (reservation) => reservation.status === "Booked"
  ).length;

  const cancelled = reservations.filter(
    (reservation) => reservation.status === "Cancelled"
  ).length;

  if (loading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <Layout>
      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
          Welcome, {user?.name}
        </h1>

        <p className="text-gray-500 mt-2">
          Manage your restaurant reservations from your dashboard.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* Recent Reservations */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-slate-800 mb-6">
          Recent Reservations
        </h2>

        {reservations.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-md p-10 text-center border border-slate-200">
            <h3 className="text-xl font-semibold">
              No reservations yet
            </h3>

            <p className="text-gray-500 mt-2">
              Create your first reservation to get started.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {reservations.slice(0, 5).map((reservation) => (
              <div
                key={reservation._id}
                className="bg-white rounded-2xl shadow-md border border-slate-200 p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4 hover:shadow-lg transition"
              >
                <div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    Table {reservation.table?.tableNumber}
                  </h3>

                  <p className="text-gray-500 mt-1">
                    {new Date(
                      reservation.reservationDate
                    ).toLocaleDateString()}
                  </p>

                  <p className="text-gray-700">
                    {reservation.timeSlot}
                  </p>
                </div>

                <StatusBadge status={reservation.status} />
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default CustomerDashboard;