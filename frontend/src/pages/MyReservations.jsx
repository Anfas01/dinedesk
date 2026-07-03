import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ReservationCard from "../components/ReservationCard";
import api from "../services/api";
import toast from "react-hot-toast";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
import ConfirmModal from "../components/ConfirmModal";

function MyReservations() {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showConfirm, setShowConfirm] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState(null);

  const fetchReservations = async () => {
    try {
      setLoading(true);

      const res = await api.get("/reservations/my");
      setReservations(res.data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, []);

  const cancelReservation = (reservation) => {
    setSelectedReservation(reservation);
    setShowConfirm(true);
  };

  const confirmCancel = async () => {
    try {
      await api.patch(
        `/reservations/${selectedReservation._id}/cancel`
      );

      setShowConfirm(false);
      setSelectedReservation(null);

      fetchReservations();

      toast.success("Reservation cancelled!");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to cancel reservation"
      );
    }
  };

  if (loading) {
    return (
      <Layout>
        <Loader />
      </Layout>
    );
  }

  return (
    <>
      <ConfirmModal
        isOpen={showConfirm}
        title="Cancel Reservation"
        message="Are you sure you want to cancel this reservation?"
        onCancel={() => {
          setShowConfirm(false);
          setSelectedReservation(null);
        }}
        onConfirm={confirmCancel}
      />

      <Navbar />

      <div className="min-h-screen bg-slate-50 py-8 md:py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
              My Reservations
            </h1>

            <p className="text-gray-500 mt-2">
              View and manage all of your restaurant reservations.
            </p>
          </div>

          {reservations.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">
              <h2 className="text-2xl font-semibold text-slate-800">
                No Reservations Found
              </h2>

              <p className="text-gray-500 mt-3">
                Your upcoming reservations will appear here.
              </p>
            </div>
          ) : (
            <div className="grid gap-5">
              {reservations.map((reservation) => (
                <ReservationCard
                  key={reservation._id}
                  reservation={reservation}
                  onCancel={cancelReservation}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default MyReservations;