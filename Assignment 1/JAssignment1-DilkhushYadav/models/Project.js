const mongoose = require("mongoose");

// Define Project Schema
const ProjectSchema = new mongoose.Schema(
    {
        // Project title
        title: { type: String, required: true }, 
        // Brief description of the project
        description: { type: String, required: true }, 
        // Array of technologies used
        technologies: { type: [String], required: true }, 
        // Optional live demo URL
        liveDemoLink: { type: String, default: "" }, 
        // Optional project image URL
        image: { type: String, default: "" } 
    },
    // Automatically adds createdAt and updatedAt fields
    { timestamps: true } 
);

// Export the Project model
module.exports = mongoose.model("Project", ProjectSchema);
