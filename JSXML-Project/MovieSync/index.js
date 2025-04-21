// Import required modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

// Load environment variables from .env
dotenv.config();

// Initialize an Express application
const app = express();

// Import TMDb and Watchmode API modules
const tmdb = require("./modules/tmdb/api");
const watchmode = require("./modules/watch/api");

// Set the port for the server, default to 8888 if not specified in environment variables
const port = process.env.PORT || "8888";

// Configure the application to use Pug as the template engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse URL-encoded data and JSON data from incoming requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GET request handler for the home page (Trending)
app.get("/", async (request, response) => {
  try {
    const trending = await tmdb.getTrending();
    response.render("index", { trending });
  } catch (error) {
    console.error("Error loading trending titles:", error.message);
    response.render("index", { trending: [] });
  }
});

// GET request handler for searching movies or shows
app.get("/search", async (request, response) => {
  const query = request.query.q;

  try {
    const results = await tmdb.searchTitles(query);
    response.render("search", { results });
  } catch (error) {
    console.error("Search error:", error.message);
    response.render("search", { results: [] });
  }
});

// GET request handler for showing detailed info + streaming availability
app.get("/details/:type/:id", async (request, response) => {
  const { type, id } = request.params;

  try {
    const details = await tmdb.getDetails(type, id);
    const titleName = details.title || details.name;
    const streaming = await watchmode.getStreamingSources(titleName);

    response.render("details", { details, streaming });
  } catch (error) {
    console.error("Details page error:", error.message);
    response.render("details", { details: null, streaming: [] });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`✅ Server running on: http://localhost:${port}`);
});
