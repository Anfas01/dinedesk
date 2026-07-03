import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CreateReservation from "./pages/CreateReservation";
import MyReservations from "./pages/MyReservations";
import NotFound from "./pages/NotFound";

import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Customer Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/customer" element={<CustomerDashboard />} />
          <Route
            path="/customer/create"
            element={<CreateReservation />}
          />
          <Route
            path="/customer/reservations"
            element={<MyReservations />}
          />
        </Route>

        {/* Admin Routes */}
        <Route element={<AdminRoute />}>
          <Route path="/admin" element={<AdminDashboard />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;