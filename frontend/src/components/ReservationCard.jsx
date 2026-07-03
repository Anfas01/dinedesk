import StatusBadge from "./StatusBadge";

function ReservationCard({ reservation, onCancel }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

        {/* Reservation Details */}
        <div className="flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <h2 className="text-2xl font-bold text-slate-800">
                Table {reservation.table.tableNumber}
              </h2>

              <p className="text-gray-500 mt-1">
                Capacity: {reservation.table.capacity} Guests
              </p>
            </div>

            <StatusBadge status={reservation.status} />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Date
              </p>

              <p className="font-semibold text-slate-800 mt-1">
                {new Date(
                  reservation.reservationDate
                ).toLocaleDateString()}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Time
              </p>

              <p className="font-semibold text-slate-800 mt-1">
                {reservation.timeSlot}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs uppercase tracking-wide text-gray-500">
                Guests
              </p>

              <p className="font-semibold text-slate-800 mt-1">
                {reservation.guestCount}
              </p>
            </div>

          </div>
        </div>

        {/* Action */}
        {reservation.status === "Booked" && (
          <div className="w-full lg:w-auto">
            <button
              onClick={() => onCancel(reservation)}
              className="w-full lg:w-auto bg-red-500 hover:bg-red-600 text-white font-medium px-6 py-3 rounded-xl transition-all duration-200 hover:scale-105"
            >
              Cancel Reservation
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ReservationCard;