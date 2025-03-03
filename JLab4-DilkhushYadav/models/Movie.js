const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  rating: String,
});

const Movie = mongoose.model("Movie", movieSchema);
module.exports = Movie;
