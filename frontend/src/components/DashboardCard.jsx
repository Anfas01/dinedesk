function DashboardCard({ title, value, color }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
      {/* Top Accent */}
      <div
        className="w-14 h-1 rounded-full mb-5"
        style={{ backgroundColor: color }}
      ></div>

      {/* Title */}
      <div className="flex items-center gap-2">
        <span
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: color }}
        ></span>

        <p className="text-sm font-medium text-gray-500">
          {title}
        </p>
      </div>

      {/* Value */}
      <h2 className="text-4xl md:text-5xl font-bold text-slate-800 mt-4">
        {value}
      </h2>
    </div>
  );
}

export default DashboardCard;