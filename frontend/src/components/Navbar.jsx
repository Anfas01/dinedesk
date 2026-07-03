import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-slate-900 shadow-lg relative">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Brand */}
        <Link
          to={user?.role === "admin" ? "/admin" : "/customer"}
          className="flex items-center gap-2 text-white text-xl font-bold"
          onClick={closeMenu}
        >
          <span className="text-2xl">🍽️</span>
          <span>DineDesk</span>
        </Link>

        {/* Hamburger */}
        <button
          className="md:hidden text-white text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        {/* Links */}
        <div
          className={`
            absolute md:static top-16 left-0 w-full md:w-auto
            bg-slate-900 md:bg-transparent
            flex flex-col md:flex-row
            items-start md:items-center
            gap-4 md:gap-6
            px-6 md:px-0
            py-4 md:py-0
            transition-all duration-200
            ${menuOpen ? "flex" : "hidden md:flex"}
          `}
        >

          {/* Customer Links */}
          {user?.role === "customer" && (
            <>
              <Link
                to="/customer"
                onClick={closeMenu}
                className="text-white hover:text-blue-400"
              >
                Dashboard
              </Link>

              <Link
                to="/customer/create"
                onClick={closeMenu}
                className="text-white hover:text-blue-400"
              >
                New Reservation
              </Link>

              <Link
                to="/customer/reservations"
                onClick={closeMenu}
                className="text-white hover:text-blue-400"
              >
                My Reservations
              </Link>
            </>
          )}

          {/* Admin Links */}
          {user?.role === "admin" && (
            <Link
              to="/admin"
              onClick={closeMenu}
              className="text-white hover:text-blue-400"
            >
              Dashboard
            </Link>
          )}

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition w-full md:w-auto"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;