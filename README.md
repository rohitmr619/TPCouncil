# TP Council - Gaming Stats Aggregator

TP Council is a gaming statistics aggregation platform that currently focuses on Clash Royale player statistics. The platform provides a centralized hub for gamers to track and analyze their performance across different games.

## Features

- **Clash Royale Integration**: Track player statistics, battle history, and clan information
- **User Authentication**: Secure login and registration system
- **Profile Management**: Customize your gaming profile and preferences
- **Real-time Stats**: Up-to-date gaming statistics and performance metrics
- **Battle Analytics**: Detailed battle history and performance analysis
- **Clan Integration**: View and manage clan information

## Screenshots

![Screenshot 2025-04-12 191938](https://github.com/user-attachments/assets/38eece54-b5b8-46a8-b48b-59741bcd61e4)

![Screenshot 2025-04-12 192050](https://github.com/user-attachments/assets/15ebc1b4-238f-4ec5-975e-ae7d94467577)

## Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Clash Royale API Integration

### Frontend
- React.js
- Material-UI
- Recharts for data visualization
- Responsive Design

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB
- Clash Royale API Key

### Installation

1. Clone the repository:
```bash
git clone https://github.com/rohitmr619/TPCouncil.git
cd TPCouncil
```

2. Install backend dependencies:
```bash
npm install
```

3. Install frontend dependencies:
```bash
cd client
npm install
```

4. Create a `.env` file in the root directory with the following variables:
```
CLASH_ROYALE_API_KEY=your_api_key
MONGODB_URI=mongodb://localhost:27017/tpcouncil
JWT_SECRET=your_jwt_secret_key
PORT=5000
```

5. Start the development servers:
```bash
# Terminal 1 (Backend)
npm run dev

# Terminal 2 (Frontend)
cd client
npm start
```

## Project Structure

```
TPCouncil/
├── client/                 # React frontend
│   ├── public/            # Static files
│   └── src/               # Source code
│       ├── components/    # React components
│       ├── config/        # Configuration files
│       └── ...
├── models/                # MongoDB models
├── routes/                # API routes
├── middleware/            # Express middleware
└── server.js             # Backend entry point
```

## Documentation

For detailed documentation about development workflows, API integration, and deployment procedures, please refer to the [Developer Documentation](documentation.md).

## Contributing

Contributions are welcome! Please read our contributing guidelines before submitting pull requests.

## License

This project is licensed under the ISC License.

## Contact

For any queries or support, please open an issue in the GitHub repository.
