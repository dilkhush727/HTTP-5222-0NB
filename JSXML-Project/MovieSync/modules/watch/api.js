const axios = require('axios');
const dotenv = require('dotenv');

// Load API key from .env
dotenv.config();

const WATCHMODE_API_KEY = process.env.WATCHMODE_API_KEY;
const BASE_URL = "https://api.watchmode.com/v1";

/**
 * Get streaming availability from Watchmode.
 * @param {string} title - The movie or TV show title to search for.
 * @returns {Promise<Array>} - List of streaming sources.
 */
async function getStreamingSources(title) {
  try {
    // First, search for the title to get its ID
    const searchRes = await axios.get(`${BASE_URL}/search/`, {
      params: {
        apiKey: WATCHMODE_API_KEY,
        search_field: "name",
        search_value: title
      }
    });

    const titleResults = searchRes.data.title_results;
    if (!titleResults || titleResults.length === 0) {
      console.warn("No Watchmode results found for:", title);
      return [];
    }

    const titleId = titleResults[0].id;

    // Then, get the sources for that title ID
    const sourcesRes = await axios.get(`${BASE_URL}/title/${titleId}/sources/`, {
      params: { apiKey: WATCHMODE_API_KEY }
    });

    const sources = sourcesRes.data.filter(source =>
      source.type === "sub" || source.type === "buy"
    );

    return sources;
  } catch (error) {
    console.error("Error fetching Watchmode data:", error.message);
    return [];
  }
}

// Export the function
module.exports = { getStreamingSources };
