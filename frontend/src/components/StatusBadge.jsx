function StatusBadge({ status }) {
  return (
    <span
      className={`px-3 py-1 rounded-full text-white text-sm font-medium ${
        status === "Booked"
          ? "bg-green-500"
          : "bg-red-500"
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;