// Importing required libraries
const express = require('express');
const path = require('path');
const { MongoClient, ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const Movie = require("./models/Movie");

// Database Connection
const dbUrl = "mongodb://127.0.0.1:27017/moviesDB";
const client = new MongoClient(dbUrl);

// Setting up the Express application
const app = express();
const PORT = process.env.PORT || 3000;

// Setting views and static file paths
app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "pug");

// Middleware setup
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// Connect to MongoDB with Mongoose
mongoose.connect(dbUrl, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));


// Initialize movie data if empty
const initializeMovies = async () => {
    const count = await Movie.countDocuments();
    if (count === 0) {
      await Movie.insertMany([
        { title: "Inception", year: 2010, rating: "PG-13" },
        { title: "The Matrix", year: 1999, rating: "R" }
      ]);
      console.log("Movies initialized.");
    }
  };
  
  initializeMovies();

// Home Route - Display all movies
app.get("/", async (req, res) => {
    const movies = await Movie.find();
    res.render("index", { title: "Home", menu: "movies", movies });
});


// Function to update movie rating only if current rating is PG-13
const updateMovieRating = async (title, newRating) => {
    const result = await Movie.updateOne(
        { title: title, rating: "PG-13" }, // Only update if the current rating is PG-13
        { $set: { rating: newRating } }
    );

    return result.modifiedCount > 0 ? "Movie rating updated to R. <a href='/'><button>Back</button></a>" : "Movie not found or rating is not PG-13. <a href='/'><button>Back</button></a>";
};

// Route to update movie rating
app.get("/update", async (req, res) => {
    const newRating = "R"; // New rating to update
    const { title, rating } = req.query; // Get title and new rating from query parameters

    if (rating != "PG-13") {
        return res.send("Movie rating is already R. <a href='/'><button>Back</button></a>");
    }

    const message = await updateMovieRating(title, newRating);
    res.send(message);
});


// Function to delete movies by rating
const deleteMoviesByRating = async (rating) => {
    await Movie.deleteMany({ rating });
    console.log(`Deleted all movies with rating ${rating}`);
};

// Route to delete movies by rating
app.get("/delete", async (req, res) => {
    await deleteMoviesByRating("R");
    res.send("Deleted all movies with rating R. <a href='/'><button>Back</button></a>");
});

// Defining routes for different pages and actions
app.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.render("index", { title: "Home", menu: "movies", movies });
});

app.listen(PORT, () => {
    console.log(`Listening at http://localhost:${PORT}`);
});