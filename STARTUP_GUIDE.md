# TiltProof Council - Startup Guide (Windows)

This document provides simple instructions for starting the TiltProof Council application on Windows.

## Prerequisites

- Node.js and npm installed
- MongoDB installed on your system

## Step 1: Start MongoDB

1. Open Command Prompt as Administrator
2. Start the MongoDB service:
   ```
   net start MongoDB
   ```
3. If successful, you'll see a message confirming MongoDB has started

## Step 2: Install Dependencies

1. Open Command Prompt
2. Navigate to the project root folder:
   ```
   cd D:\Projects\TPCouncil
   ```
3. Install dependencies for the root folder:
   ```
   npm install
   ```

## Step 3: Start the Backend Server

1. In the same Command Prompt window (still in the root folder)
2. Start the server:
   ```
   npm start
   ```
3. You should see messages indicating:
   - "Connected to MongoDB"
   - "Server is running on port 5000"

## Step 4: Start the Client Application

1. Open a new Command Prompt window
2. Navigate to the client folder:
   ```
   cd D:\Projects\TPCouncil\client
   ```
3. Install client dependencies (if not already done):
   ```
   npm install
   ```
4. Start the client application:
   ```
   npm start
   ```
5. The application should automatically open in your default browser at `http://localhost:3000`

## Troubleshooting

- If you see "MongoDB connection error", ensure MongoDB is running
- If you see "Network Error" in the browser, ensure the backend server is running
- If the login image doesn't appear, check that `login.png` exists in the `client/public` folder
- If you get "port already in use" errors, close any applications using ports 3000 or 5000

## Additional Notes

- Keep both Command Prompt windows open while using the application
- The backend server must be running for registration and login to work
- To stop the application, press Ctrl+C in both Command Prompt windows 