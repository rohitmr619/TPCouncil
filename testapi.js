require('dotenv').config();
const axios = require('axios');
const readline = require('readline');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Function to fetch player data from Clash Royale API
async function fetchPlayerData(playerTag) {
  try {
    // Remove # if included in the player tag
    const formattedTag = playerTag.startsWith('#') 
      ? playerTag.substring(1) 
      : playerTag;
    
    // Get API key from environment variables
    const API_KEY = process.env.CLASH_ROYALE_API_KEY;
    
    if (!API_KEY) {
      throw new Error('API key not found. Please set CLASH_ROYALE_API_KEY in your .env file.');
    }
    
    const response = await axios.get(
      `https://api.clashroyale.com/v1/players/%23${formattedTag}`,
      {
        headers: {
          'Authorization': `Bearer ${API_KEY}`,
          'Accept': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Status code:', error.response.status);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    throw error;
  }
}

// Main function to handle the process
async function main() {
  try {
    rl.question('Enter Clash Royale player tag (e.g., #V2RJUG0P): ', async (playerTag) => {
      if (!playerTag || playerTag.trim() === '') {
        console.error('Player tag is required.');
        rl.close();
        return;
      }
      
      console.log('Fetching data for player tag:', playerTag);
      
      try {
        const playerData = await fetchPlayerData(playerTag);
        console.log('Player Data:');
        console.log(JSON.stringify(playerData, null, 2));
      } catch (error) {
        console.error('Failed to fetch player data.');
      }
      
      rl.close();
    });
  } catch (error) {
    console.error('An unexpected error occurred:', error);
    rl.close();
  }
}

// Start the program
main(); 