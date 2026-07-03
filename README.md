# 🍽️ DineDesk

A modern full-stack restaurant reservation management system built using the **MERN Stack** (MongoDB, Express.js, React, and Node.js). DineDesk allows customers to reserve tables online while providing administrators with a powerful dashboard to manage reservations efficiently.

---

## 🚀 Features

### 👤 Customer Features

- User Registration & Login
- Secure JWT Authentication
- Create Restaurant Reservations
- Automatic Table Assignment
- View Personal Reservations
- Cancel Reservations
- Dashboard with Reservation Statistics
- Responsive User Interface

### 👑 Admin Features

- Secure Admin Login
- View All Reservations
- Search Reservations by Customer Name
- Filter Reservations by Date
- Update Reservation Details
- Cancel Customer Reservations
- Dashboard Statistics
- Responsive Admin Dashboard

---

## 🛠️ Tech Stack

### Frontend

- React
- React Router DOM
- Tailwind CSS
- Axios
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs
- dotenv
- CORS

---

## 📂 Project Structure

```
DineDesk
│
├── client
│   ├── src
│   │   ├── components
│   │   ├── context
│   │   ├── pages
│   │   ├── services
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## 🔐 Authentication

The application uses **JSON Web Tokens (JWT)** for authentication.

### Customer Permissions

- Register
- Login
- Create Reservations
- View Own Reservations
- Cancel Own Reservations

### Admin Permissions

- Login
- View All Reservations
- Search Reservations
- Filter Reservations
- Edit Reservations
- Cancel Reservations

Role-based authorization prevents customers from accessing administrator routes.

---

## 🍽️ Reservation Logic

The reservation system automatically assigns the most suitable table.

### Reservation Flow

1. Customer selects:
   - Reservation Date
   - Time Slot
   - Number of Guests

2. The server checks:
   - Already booked tables
   - Table capacity
   - Available tables

3. The smallest available table that fits the guest count is assigned automatically.

4. If no suitable table is available, the reservation request is rejected.

### Validation

- Prevents double booking
- Prevents over-capacity reservations
- Prevents invalid reservations
- Uses server-side validation

---

## ⚙️ Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key
```

---

## 💻 Installation

### Clone the Repository

```bash
git clone https://github.com/Anfas01/dinedesk.git
```

### Backend Setup

```bash
cd server

npm install

npm run dev
```

### Frontend Setup

```bash
cd client

npm install

npm run dev
```

---

## 👤 Demo Accounts

### 👤 Customer

| Email | Password |
|--------|----------|
| `denji@example.com` | `denji123` |

### 👑 Admin

| Email | Password |
|--------|----------|
| `admin@example.com` | `admin123` |

These demo accounts allow recruiters and reviewers to explore both the customer and administrator features of the application.

---

## 📸 Screenshots

Add screenshots after deployment.

```
screenshots/

login.png

register.png

customer-dashboard.png

my-reservations.png

create-reservation.png

admin-dashboard.png
```

---

## 🌐 Live Demo

### Frontend

```
Coming Soon
```

### Backend API

```
Coming Soon
```

---

## 📌 Future Improvements

- Email confirmation after reservation
- Reservation reminder notifications
- Customer profile management
- Restaurant table management
- Reservation analytics dashboard
- Dark mode
- Pagination
- Real-time reservation updates with Socket.IO

---

## 👨‍💻 Author

**Anfas**

GitHub: https://github.com/Anfas01

---

## 📄 License

This project was developed as a portfolio project for internship evaluation and learning purposes.