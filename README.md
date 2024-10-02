# To-Do Done Backend

This is the backend API for a **Task Management Dashboard** that includes user authentication, task management (CRUD operations), and a Kanban board feature. The backend is built using **Express**, connected to a **MongoDB** database, and uses **JWT** for user authentication. The frontend is built with **Next.js**, and the backend is designed to integrate seamlessly with it.

## Features

- User Authentication (Register/Login) using JWT.
- Protected routes to allow only authenticated users to access tasks.
- Create, Read, Update, and Delete tasks.
- Tasks can be filtered and sorted by status, priority, and due date.
- Tasks have a Kanban-style status with drag-and-drop functionality on the frontend.
- User password encryption with `bcryptjs`.
- Input validation using `Zod`.

## Project Structure

```
todo-done-backend/
├── config/
│   └── db.js            # Database connection setup
├── controllers/
│   ├── authController.js # Handles authentication logic
│   └── taskController.js # Handles task CRUD logic
├── middlewares/
│   └── authMiddleware.js # Authentication middleware to protect routes
├── models/
│   ├── Task.js           # Task model schema
│   └── User.js           # User model schema
├── routes/
│   ├── authRoutes.js     # Routes for user authentication (login/register)
│   └── taskRoutes.js     # Routes for task operations (CRUD)
├── utils/
│   └── validate.js       # Zod validation schemas for input validation
├── .env                  # Environment variables (not included in version control)
├── app.js                # Main application file
├── package.json          # NPM dependencies and scripts
└── README.md             # Project documentation
```

## Requirements

Before starting, ensure you have:

- **Node.js** (version 14 or higher)
- **MongoDB** (local or MongoDB Atlas)

## Installation

1. **Clone the repository:**

   ```bash
  git clone https://github.com/10kumaranurag01/todo-done-express.git
  cd todo-done-express
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Create a `.env` file:**

   At the root of the project, create a `.env` file with the following contents:

   ```bash
   MONGO_URI=mongodb://localhost:27017/taskmanager # Update this to your MongoDB URI
   JWT_SECRET=your_jwt_secret                      # Set a strong JWT secret
   ```

4. **Run the server:**

   ```bash
   npm run dev
   ```

   The server will start on **http://localhost:5000**.

## API Endpoints

### Authentication Routes

| Method | Endpoint         | Description           | Protected |
|--------|------------------|-----------------------|-----------|
| POST   | `/api/auth/register` | Register a new user  | No        |
| POST   | `/api/auth/login`    | Log in an existing user | No     |

### Task Management Routes

| Method | Endpoint          | Description                       | Protected |
|--------|-------------------|-----------------------------------|-----------|
| GET    | `/api/tasks`       | Fetch all tasks for the logged-in user | Yes    |
| POST   | `/api/tasks`       | Create a new task                | Yes       |
| PUT    | `/api/tasks/:id`   | Update an existing task          | Yes       |
| DELETE | `/api/tasks/:id`   | Delete a task                    | Yes       |

### Example API Responses

#### Register a New User

- **Endpoint:** `POST /api/auth/register`
- **Request Body:**
  ```json
  {
    "username": "JohnDoe",
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "60d1d20d925f3b3f30fc446e",
    "username": "JohnDoe",
    "email": "john@example.com",
    "token": "your-jwt-token"
  }
  ```

#### Login a User

- **Endpoint:** `POST /api/auth/login`
- **Request Body:**
  ```json
  {
    "username": "JohnDoe",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "_id": "60d1d20d925f3b3f30fc446e",
    "username": "JohnDoe",
    "email": "john@example.com",
    "token": "your-jwt-token"
  }
  ```

#### Get All Tasks

- **Endpoint:** `GET /api/tasks`
- **Response:**
  ```json
  [
    {
      "_id": "60d1e5f9b2d3b6b5d865df36",
      "title": "Build the API",
      "description": "Finish building the backend API",
      "status": "In Progress",
      "priority": "High",
      "dueDate": "2023-12-01T00:00:00.000Z",
      "userId": "60d1d20d925f3b3f30fc446e"
    },
    {
      "_id": "60d1e602b2d3b6b5d865df37",
      "title": "Connect to MongoDB",
      "description": "Connect the API to a MongoDB database",
      "status": "To Do",
      "priority": "Medium",
      "dueDate": null,
      "userId": "60d1d20d925f3b3f30fc446e"
    }
  ]
  ```

## Environment Variables

You need to define the following environment variables in your `.env` file:

| Variable   | Description                            |
|------------|----------------------------------------|
| `MONGO_URI`| MongoDB connection string              |
| `JWT_SECRET` | Secret key for signing JWT tokens     |

## Running the Project in Development

To start the development server with **nodemon**, use:

```bash
npm run dev
```

This will automatically restart the server when file changes are detected.

## Error Handling

- All request validation errors are handled using **Zod**.
- Invalid JWT tokens return a 401 Unauthorized response.
- MongoDB errors and other server errors return appropriate error responses.

## Technologies Used

- **Node.js**: Backend runtime environment.
- **Express**: Web framework for Node.js.
- **MongoDB**: NoSQL database for storing users and tasks.
- **Mongoose**: Object Data Modeling (ODM) library for MongoDB.
- **JWT**: For authentication and securing API endpoints.
- **Zod**: Schema validation for user input.
- **bcryptjs**: Password hashing.

## Deployment

To deploy the backend:

1. Set the environment variables (`MONGO_URI`, `JWT_SECRET`) on your hosting provider (e.g., Heroku, Vercel).
2. Deploy the app on your preferred platform.
3. Ensure the frontend is correctly pointing to the deployed API.
