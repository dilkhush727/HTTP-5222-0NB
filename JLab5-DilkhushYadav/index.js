//import required modules
const express = require("express");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const { getAnticipatedShows } = require("./components/trakt/api");

//set up Express app
const app = express();
const port = process.env.PORT || 3000

//define important folders
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

//setup public folder
app.use(express.static(path.join(__dirname, "public")));

//PAGE ROUTES

// Home route
app.get("/", async (request, response) => {
  response.render("index", {title: "Trakt APIs"});
});

// Route to display top 15 anticipated shows
app.get("/anticipated", async (request, response) => {
  try {
      const shows = await getAnticipatedShows(); // Fetch anticipated shows
      response.render("anticipated", { 
          title: "Top 15 Most Anticipated Shows", 
          shows 
      });
  } catch (error) {
      console.error("Error fetching anticipated shows:", error);
      response.status(500).send("Error fetching anticipated shows");
  }
});

//set up server listening
app.listen(port, () => {
  console.log(`Listening on http://localhost:${port}`);
});
