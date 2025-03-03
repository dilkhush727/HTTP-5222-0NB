const mongoose = require("mongoose");

// Define Skill Schema
const SkillSchema = new mongoose.Schema(
    {
         // Skill name (e.g., JavaScript, Node.js)
        name: { type: String, required: true },
        // Category (e.g., Frontend, Backend)
        category: { type: String, required: true } 
    },
    // Automatically adds createdAt and updatedAt fields
    { timestamps: true } 
);

// Export the Skill model
module.exports = mongoose.model("Skill", SkillSchema);
