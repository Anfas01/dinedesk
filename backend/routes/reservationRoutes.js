const express = require("express");
const {
  createReservation,
  getMyReservations,
  cancelReservation,
  getAllReservations,
  getReservationsByDate,
  updateReservation,
  adminCancelReservation,
} = require("../controllers/reservationController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

const router = express.Router();

router.post("/", protect, createReservation);

router.get("/my", protect, getMyReservations);

router.get("/", protect, adminOnly, getAllReservations);

router.get("/date/:date", protect, adminOnly, getReservationsByDate);

router.put("/:id", protect, adminOnly, updateReservation);

router.patch(
  "/admin/:id/cancel", protect, adminOnly, adminCancelReservation);

router.patch("/:id/cancel", protect, cancelReservation);

module.exports = router;