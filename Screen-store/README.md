🛍️ Screen Store

Screen Store is a full-stack e-commerce web application built using React.js, Node.js, Express.js, and MongoDB Atlas.

Features

- User Signup and Login with JWT Authentication
- View and Manage Products
- Add to Cart, Update Quantity, and Remove Items
- MongoDB Database Integration
- REST API 

Technologies Used

- Frontend: React.js, HTML, CSS, Bootstrap
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JWT and bcrypt

Project Structure

Screen-Store/
├── frontend/
└── backend/
    ├── config/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── server.js
    └── .env

Installation

Backend:

cd backend
npm install
npm run dev

Frontend:

cd frontend
npm install
npm run dev

Database Setup

Add your MongoDB Atlas connection string and JWT secret to the backend ".env" file.

API Endpoints

- "/api/auth" — Signup and Login
- "/api/products" — Product Management
- "/api/cart" — Cart Management
- "/api/orders" — Order Management

Note: Online payment integration is not included in the demo checkout.