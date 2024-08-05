# Student Management System - Backend

## Overview

The backend for the Student Management System is built with Node.js, PostgreSQL, and Prisma. It provides API endpoints for managing students, courses, authentication, and more.

## Prerequisites

Before setting up the backend, make sure you have the following installed:

1. **Node.js**: Download and install from [nodejs.org](https://nodejs.org/).
2. **PostgreSQL**: Install PostgreSQL and start the service. On macOS, you can use [Homebrew](https://brew.sh/):

    ```bash
    brew install postgresql
    brew services start postgresql
    ```

3. **Prisma**: Install Prisma globally if it's not already installed:

    ```bash
    npm install -g prisma
    ```

## Setup

### 1. Clone the Repository

Clone the repository and navigate into the backend directory:

    ```bash
    git clone https://github.com/yourusername/student-management-system.git
    cd student-management-system/backend
    ```

### 2. Install Dependencies

Install the backend dependencies:

    ```bash
    npm install
    ```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory with the following content:

    ```env
    DATABASE_URL=postgresql://user:password@localhost:5432/mydatabase
    ```

Replace `user`, `password`, and `mydatabase` with your PostgreSQL credentials.

### 4. Database Setup and Migrations

Run the migrations and generate Prisma client:

    ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```

### 5. Start the Development Server

Start the development server:

    ```bash
    npm run dev
    ```

For production, use:

    ```bash
    npm start
    ```

The backend will be available at `http://localhost:3000`.

## API Endpoints

### Authentication

- **POST** `/api/auth/signup`: Register a new user.
- **POST** `/api/auth/login`: Log in and obtain a JWT token.

### Student Management

- **GET** `/api/students`: Get all students.
- **GET** `/api/students/:id`: Get a student by ID.
- **POST** `/api/students`: Add a new student.
- **PUT** `/api/students/:id`: Update a student.
- **DELETE** `/api/students/:id`: Delete a student.

### Course Management

- **GET** `/api/courses`: Get all courses.
- **GET** `/api/courses/:id`: Get a course by ID.
- **POST** `/api/courses`: Add a new course.
- **PUT** `/api/courses/:id`: Update a course.
- **DELETE** `/api/courses/:id`: Delete a course.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
