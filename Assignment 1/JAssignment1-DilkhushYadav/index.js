require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

// Import Routes
const adminRoutes = require("./routes/adminRoutes");

// Initialize Express App
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set Pug as the View Engine
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));

// Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.error("MongoDB Connection Error:", err));

// Use Routes
app.use("/admin", adminRoutes);

// Home Route
app.get("/", (req, res) => {
    res.send("Portfolio API is running!");
});

// Start Server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
