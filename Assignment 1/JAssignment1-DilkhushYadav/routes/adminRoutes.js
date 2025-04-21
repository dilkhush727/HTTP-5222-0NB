const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Skill = require("../models/Skill");

// Admin Dashboard - List all projects and skills
router.get("/", async (req, res) => {
    try {
        const projects = await Project.find() || []; // Ensure projects is always an array
        
        // Aggregate skills by category
        const skillsByCategory = await Skill.aggregate([
            { 
                $group: { 
                    _id: "$category", 
                    skills: { $push: { name: "$name" } }
                } 
            },
            { $sort: { _id: 1 } } // Sort categories alphabetically
        ]);

        res.render("admin/dashboard", { title: "Dashboard", projects, skillsByCategory });
        
    } catch (err) {
        console.error("Error fetching projects or skills:", err);
        res.render("admin/dashboard", { title: "Dashboard", projects: [], skills: [] });
    }
});

// Route to add a new project (GET form)
router.get("/projects/add", (req, res) => {
    res.render("admin/addProject", { title: "Add Project" });
});

// Route to add a new project (POST)
router.post("/projects/add", async (req, res) => {
    try {
        const { title, description, technologies, liveDemoLink } = req.body;
        const newProject = new Project({ title, description, technologies, liveDemoLink });
        await newProject.save();
        res.redirect("/admin");
    } catch (err) {
        console.error("Error adding project:", err);
        res.status(500).send("Failed to add project.");
    }
});

// Route to add a new skill (GET form)
router.get("/skills/add", (req, res) => {
    res.render("admin/addSkill", { title: "Add Skill" });
});

// Route to add a new skill (POST)
router.post("/skills/add", async (req, res) => {
    try {
        const { name, category } = req.body;
        const newSkill = new Skill({ name, category });
        await newSkill.save();
        res.redirect("/admin");
    } catch (err) {
        console.error("Error adding skill:", err);
        res.status(500).send("Failed to add skill.");
    }
});
router.get("/skills/api", async (req, res) => {
    const skills = await Skill.find();
    
    res.json(projects);
});

// Route to delete a project
router.post("/projects/delete/:id", async (req, res) => {
    try {
        await Project.findByIdAndDelete(req.params.id);
        res.redirect("/admin");
    } catch (err) {
        console.error("Error deleting project:", err);
        res.status(500).send("Failed to delete project.");
    }
});
router.get("/projects/api", async (req, res) => {
    const projects = await Project.find();
    
    res.json(projects);
});
// Route to delete a skill
router.post("/skills/delete/:id", async (req, res) => {
    try {
        await Skill.findByIdAndDelete(req.params.id);
        res.redirect("/admin");
    } catch (err) {
        console.error("Error deleting skill:", err);
        res.status(500).send("Failed to delete skill.");
    }
});

module.exports = router;
