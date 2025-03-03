const express = require("express");
const path = require("path");

const app = express();

// Port configuration
const port = process.env.PORT || "8080";

// Set the views directory
app.set("views", path.join(__dirname, "templates"));
app.use(express.static(path.join(__dirname,"public")));

// Set the view engine to Pug
app.set("view engine", "pug");

// Define the route
app.get("/", (request, response) => {
    response.render("index", { title: "Home" });
});

// Start the server
app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);  // Use backticks for interpolation
});
