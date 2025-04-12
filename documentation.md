# TP Council Developer Documentation

## Branch Structure

The project maintains two main branches:

1. **main**: Development branch
   - Contains latest development code
   - Used for feature development and testing
   - All new features and bug fixes are committed here first
   - Requires pull request and review for merging

2. **production**: Production branch
   - Contains deployed code
   - Automatically deploys when code is pushed
   - Only receives code from main branch after thorough testing
   - Protected branch (requires pull request and review)

### Branch Workflow
1. Create feature branch from `main`
2. Develop and test features
3. Create pull request to `main`
4. After review and approval, merge to `main`
5. Create pull request from `main` to `production`
6. After review and approval, merge to `production`
7. Automatic deployment is triggered

## Environment Configuration

### Development Environment
- Uses `localhost:5000` for API calls
- Configured in `client/src/config.js`
- Default environment variables in `.env`

### Production Environment
- Uses `20.244.50.82:5000` for API calls
- Configured in `client/.env.production`
- Environment variables set in production server

## API Integration

### Clash Royale API
- Base URL: `https://api.clashroyale.com/v1`
- Authentication: Bearer token
- Rate limiting: 1000 requests per hour

### API Endpoints
1. Player Statistics
   - Endpoint: `/players/{playerTag}`
   - Method: GET
   - Response: Player details, trophies, clan info

2. Battle History
   - Endpoint: `/players/{playerTag}/battlelog`
   - Method: GET
   - Response: Recent battles and outcomes

3. Clan Information
   - Endpoint: `/clans/{clanTag}`
   - Method: GET
   - Response: Clan details and members

## Database Schema

### User Model
```javascript
{
  username: String,
  email: String,
  password: String,
  playerTag: String,
  trophyCount: Number,
  gameTags: {
    clashRoyale: String,
    clashOfClans: String
  },
  createdAt: Date
}
```

## Development Setup

### Backend Setup
1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

### Frontend Setup
1. Install dependencies:
```bash
cd client
npm install
```

2. Start development server:
```bash
npm start
```

## Deployment Process

### Production Deployment
1. Build frontend:
```bash
cd client
npm run build
```

2. Deploy backend:
```bash
npm run deploy
```

### CI/CD Pipeline
1. On push to `main`:
   - Run tests
   - Build frontend
   - Deploy to staging

2. On merge to `production`:
   - Run all tests
   - Build frontend
   - Deploy to production
   - Run database migrations

## Best Practices

### Code Quality
- Follow ESLint rules
- Write unit tests for new features
- Document API changes
- Use meaningful commit messages

### Security
- Never commit API keys or secrets
- Validate all user input
- Use proper authentication
- Implement rate limiting

### Performance
- Cache API responses
- Optimize database queries
- Use pagination for large datasets
- Implement proper error handling

## Troubleshooting

### Common Issues

1. **API Rate Limiting**
   - Check proxy server logs
   - Verify API key validity
   - Implement proper caching

2. **Database Connection**
   - Verify MongoDB URI
   - Check network connectivity
   - Monitor connection pool

3. **Deployment Failures**
   - Check GitHub Actions logs
   - Verify environment variables
   - Monitor server resources

## Support

For technical support or questions:
1. Check the project's GitHub issues
2. Contact the development team
3. Refer to the API documentation 