const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const reservationRoutes = require("./routes/reservationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Restaurant Reservation API");
});

app.use("/api/auth", authRoutes);
app.use("/api/reservations", reservationRoutes);

module.exports = app;