const Reservation = require("../models/Reservation");
const Table = require("../models/Table");

const createReservation = async (req, res) => {
  try {
    const { reservationDate, timeSlot, guestCount } = req.body;

    if (!reservationDate || !timeSlot || !guestCount) {
      return res.status(400).json({
        message: "Please provide reservation date, time slot and guest count.",
      });
    }

    const tables = await Table.find({
      capacity: { $gte: guestCount },
    }).sort({ capacity: 1 });

    if (tables.length === 0) {
      return res.status(400).json({
        message: "No table can accommodate this number of guests.",
      });
    }

    let availableTable = null;

    for (const table of tables) {
      const existingReservation = await Reservation.findOne({
        table: table._id,
        reservationDate: new Date(reservationDate),
        timeSlot,
        status: "Booked",
      });

      if (!existingReservation) {
        availableTable = table;
        break;
      }
    }

    if (!availableTable) {
      return res.status(400).json({
        message: "No tables available for the selected date and time.",
      });
    }

    const reservation = await Reservation.create({
      user: req.user._id,
      table: availableTable._id,
      reservationDate,
      timeSlot,
      guestCount,
    });

    res.status(201).json({
      message: "Reservation created successfully.",
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({
      user: req.user._id,
    })
      .populate("table", "tableNumber capacity")
      .sort({ reservationDate: -1 });

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const cancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found.",
      });
    }

    // Make sure the reservation belongs to the logged-in user
    if (reservation.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        message: "You can only cancel your own reservations.",
      });
    }

    reservation.status = "Cancelled";
    await reservation.save();

    res.status(200).json({
      message: "Reservation cancelled successfully.",
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find()
      .populate("user", "name email")
      .populate("table", "tableNumber capacity")
      .sort({ reservationDate: -1 });

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getReservationsByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const reservations = await Reservation.find({
      reservationDate: new Date(date),
    })
      .populate("user", "name email")
      .populate("table", "tableNumber capacity")
      .sort({ timeSlot: 1 });

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateReservation = async (req, res) => {
  try {
    const { reservationDate, timeSlot, guestCount } = req.body;

    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found.",
      });
    }

    // Find a suitable table
    const tables = await Table.find({
      capacity: { $gte: guestCount },
    }).sort({ capacity: 1 });

    let assignedTable = null;

    for (const table of tables) {
      const existingReservation = await Reservation.findOne({
        _id: { $ne: reservation._id }, // Ignore current reservation
        table: table._id,
        reservationDate: new Date(reservationDate),
        timeSlot,
        status: "Booked",
      });

      if (!existingReservation) {
        assignedTable = table;
        break;
      }
    }

    if (!assignedTable) {
      return res.status(400).json({
        message: "No tables available.",
      });
    }

    reservation.reservationDate = reservationDate;
    reservation.timeSlot = timeSlot;
    reservation.guestCount = guestCount;
    reservation.table = assignedTable._id;

    await reservation.save();

    res.status(200).json({
      message: "Reservation updated successfully.",
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const adminCancelReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        message: "Reservation not found.",
      });
    }

    reservation.status = "Cancelled";

    await reservation.save();

    res.status(200).json({
      message: "Reservation cancelled successfully by admin.",
      reservation,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createReservation,
  getMyReservations,
  cancelReservation,
  getAllReservations,
  getReservationsByDate,
  updateReservation,
  adminCancelReservation,
};