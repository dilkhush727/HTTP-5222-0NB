const axios = require('axios');
const dotenv = require('dotenv');

// Load API key from .env
dotenv.config();

const TMDB_API_KEY = process.env.TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Get trending movies and TV shows of the week from TMDb.
 * @returns {Promise<Array>} - Array of trending media.
 */
async function getTrending() {
  try {
    const response = await axios.get(`${BASE_URL}/trending/all/week`, {
      params: {
        api_key: TMDB_API_KEY
      }
    });

    return response.data.results;
  } catch (error) {
    console.error("Error fetching trending titles:", error.message);
    throw error;
  }
}

/**
 * Search for movies or TV shows based on query.
 * @param {string} query - Search keyword.
 * @returns {Promise<Array>} - Search results.
 */
async function searchTitles(query) {
  try {
    const response = await axios.get(`${BASE_URL}/search/multi`, {
      params: {
        api_key: TMDB_API_KEY,
        query
      }
    });

    return response.data.results;
  } catch (error) {
    console.error("Error searching TMDb titles:", error.message);
    throw error;
  }
}

/**
 * Get detailed information including cast for a title.
 * @param {string} type - 'movie' or 'tv'
 * @param {number} id - TMDb ID of the title
 * @returns {Promise<Object>} - Detailed media object
 */
async function getDetails(type, id) {
  try {
    const response = await axios.get(`${BASE_URL}/${type}/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        append_to_response: 'credits'
      }
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching TMDb details:", error.message);
    throw error;
  }
}

// Export all functions
module.exports = {
  getTrending,
  searchTitles,
  getDetails
};
