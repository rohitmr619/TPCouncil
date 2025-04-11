# TiltProof Council - Startup Guide

This document provides step-by-step instructions for starting the MongoDB server and the client application.

## Prerequisites

- Node.js and npm installed
- MongoDB installed on your system
- Git (for cloning the repository)

## Starting MongoDB Server

1. Open a terminal/command prompt
2. Start the MongoDB service:

   **Windows:**
   ```
   net start MongoDB
   ```

   **macOS/Linux:**
   ```
   sudo service mongod start
   ```
   
   or
   
   ```
   mongod --dbpath /path/to/data/directory
   ```

3. Verify MongoDB is running by connecting to it:
   ```
   mongo
   ```
   or
   ```
   mongosh
   ```

## Starting the Client Application

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies (if not already done):
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. The application should automatically open in your default browser at `http://localhost:3000`

## Starting the Backend Server (if applicable)

1. Open a new terminal/command prompt
2. Navigate to the server directory:
   ```
   cd server
   ```

3. Install dependencies (if not already done):
   ```
   npm install
   ```

4. Start the server:
   ```
   npm start
   ```
   or
   ```
   node server.js
   ```

5. The server should be running at `http://localhost:5000`

## Troubleshooting

- If MongoDB fails to start, check if the service is already running
- If the client app fails to start, ensure all dependencies are installed
- Check that the MongoDB connection string in the server configuration is correct
- Ensure ports 3000 (client) and 5000 (server) are not being used by other applications

## Additional Notes

- The client application uses the login image located at `client/public/login.png`
- Make sure the image file exists in the correct location before starting the application 