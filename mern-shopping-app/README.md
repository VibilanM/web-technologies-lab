# Exercise-8: Development of a Simple Shopping Application Using the MERN Stack

## Aim
Develop a simple shopping application using **MongoDB**, **Express.js**, **React.js**, and **Node.js** (MERN Stack). The application supports:
- User registration
- Login validation
- Product retrieval and display
- User profile management using RESTful API operations

---

## Architecture & Project Structure

```
mern-shopping-app/
├── backend/
│   ├── models/
│   │   ├── Product.js          # Products collection Mongoose schema
│   │   └── User.js             # Users collection Mongoose schema
│   ├── routes/
│   │   ├── productRoutes.js    # GET /api/products (authenticated) & POST /api/products
│   │   └── userRoutes.js       # POST /api/users, POST /api/login, PUT, PATCH, DELETE
│   ├── seed.js                 # Initial product seeding script
│   ├── server.js               # Express application entry point & DB connection
│   ├── .env                    # Environment variables (MONGO_URI, PORT)
│   ├── .env.example            # Sample environment configuration
│   └── package.json            # Backend dependencies
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx      # Navigation bar with login/logout states
│   │   │   └── ProductCard.jsx # Card displaying all 6 product details
│   │   ├── pages/
│   │   │   ├── Register.jsx    # Page 1: User Registration
│   │   │   ├── Login.jsx       # Page 2: User Login
│   │   │   ├── Products.jsx    # Page 3: Products Display (Authenticated)
│   │   │   └── Profile.jsx     # Section 3: User Profile Management (PUT, PATCH, DELETE)
│   │   ├── App.jsx             # React router & authentication state management
│   │   ├── index.css           # Styling
│   │   └── main.jsx            # React root mount
│   ├── index.html
│   ├── vite.config.js          # Vite config with /api proxy to Express backend
│   └── package.json            # Frontend dependencies
├── package.json                # Root package scripts
└── README.md
```

---

## 1. Database Design (MongoDB Collections)

### A. Products Collection (`products`)
Stores the catalog of available products:
1. `productId` (String, unique, required) — Unique identifier for each product
2. `productName` (String, required) — Name of the product
3. `productPrice` (Number, required) — Price of the product
4. `category` (String, required) — Category of the product
5. `quantity` (Number, required) — Available quantity
6. `description` (String, required) — Product description

### B. Users Collection (`users`)
Stores registered users (used for both registration and login):
1. `username` (String, required) — Name of the user
2. `emailId` (String, unique, required) — Email address
3. `age` (Number, required) — Age of the user
4. `password` (String, required) — Password of the user

---

## 2. REST API Endpoints

| HTTP Method | Endpoint | Description / Purpose |
| :--- | :--- | :--- |
| **POST** | `/api/users` | Register a new user |
| **POST** | `/api/login` | Validate user login |
| **GET** | `/api/products` | Retrieve all products (*authenticated users only*) |
| **PUT** | `/api/users?emailId=user@example.com` | Update complete editable profile details |
| **PATCH** | `/api/users?emailId=user@example.com` | Update selected profile fields |
| **DELETE** | `/api/users?emailId=user@example.com` | Delete a user's registration record |

### Detailed API Behavior

#### 1. User Registration: `POST /api/users`
- **Request Body:**
  ```json
  {
    "username": "Raghavendra",
    "emailId": "raghav@example.com",
    "age": 22,
    "password": "Password123"
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Successfully registered! Welcome, Raghavendra.",
    "data": {
      "username": "Raghavendra",
      "emailId": "raghav@example.com",
      "age": 22
    }
  }
  ```
- **Error Response (400 Bad Request):** If email is already registered or required fields are missing.

#### 2. User Login: `POST /api/login`
- **Request Body:**
  ```json
  {
    "emailId": "raghav@example.com",
    "password": "Password123"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Login successful.",
    "user": {
      "username": "Raghavendra",
      "emailId": "raghav@example.com",
      "age": 22
    },
    "token": "auth_cmFnaGF2QGV4YW1wbGUuY29t"
  }
  ```
- **Error Responses:**
  - If email not registered: `404` `{ "success": false, "message": "User Not Registered." }`
  - If password does not match: `401` `{ "success": false, "message": "Invalid Password." }`

#### 3. Products Retrieval: `GET /api/products`
- **Headers:** `Authorization: Bearer <token>` or `x-user-email: user@example.com`
- **Access Control:** Returns `401 Unauthorized` if no authentication header is supplied.
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "data": [
      {
        "productId": "P101",
        "productName": "Sony WH-1000XM4 Headphones",
        "productPrice": 19990,
        "category": "Electronics",
        "quantity": 25,
        "description": "Industry-leading noise canceling headphones."
      }
    ]
  }
  ```
- If no products are present, returns `{ "success": true, "data": [], "message": "No products available in the store." }`.

#### 4. Complete Profile Update: `PUT /api/users?emailId=user@example.com`
- **Request Body:**
  ```json
  {
    "username": "Raghavendra R",
    "age": 23,
    "password": "NewPassword123"
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Complete profile updated successfully.",
    "data": {
      "username": "Raghavendra R",
      "emailId": "raghav@example.com",
      "age": 23
    }
  }
  ```

#### 5. Selected Details Update: `PATCH /api/users?emailId=user@example.com`
- **Request Body:**
  ```json
  {
    "age": 24
  }
  ```
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Selected profile fields updated successfully.",
    "data": {
      "username": "Raghavendra R",
      "emailId": "raghav@example.com",
      "age": 24
    }
  }
  ```

#### 6. Delete User: `DELETE /api/users?emailId=user@example.com`
- **Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "User record for Raghavendra R (raghav@example.com) deleted successfully."
  }
  ```

---

## 3. Front-End Web Pages (React.js)

1. **Page 1: User Registration (`/register`)**
   - Functional component using `useState()`.
   - Input fields: Username, Email ID, Age, Password.
   - Sends HTTP POST to `/api/users`.
   - Displays personalized success message: `Successfully registered! Welcome, <username>.`
   - Displays error messages if registration fails.

2. **Page 2: User Login (`/login`)**
   - Functional component with `useState()`.
   - Input fields: Email ID, Password.
   - Sends HTTP POST to `/api/login`.
   - Displays `User Not Registered.` or `Invalid Password.` based on backend validation.
   - On successful credentials, navigates to Products Display page.

3. **Page 3: Products Display (`/products`)**
   - Protected: Blocks unauthenticated users directly.
   - Fetches product list using HTTP GET to `/api/products` via `useEffect()`.
   - Displays all product attributes: Product ID, Name, Price, Category, Available Quantity, and Description.
   - Handles empty state when no products are in the database.

4. **Section 3: Profile Management (`/profile`)**
   - Directly executes `PUT` (complete update), `PATCH` (selected field update), and `DELETE` (delete account) with immediate visual feedback.

---

## 4. How to Run the Application

### 1. Start the Backend Server
```bash
cd mern-shopping-app/backend
npm start
```
The backend server runs on `http://localhost:5000`. It will connect to MongoDB and automatically seed sample products if the Products collection is empty.

*(Optional manual seed)*:
```bash
node seed.js
```

### 2. Start the React Frontend
In a new terminal:
```bash
cd mern-shopping-app/frontend
npm run dev
```
Open `http://localhost:5173` in your browser.

