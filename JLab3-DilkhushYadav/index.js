// Importing required libraries
const express = require("express");
const path = require("path");
const { MongoClient, ObjectId } = require("mongodb");

// Database connection URL and MongoDB client
const dbUrl = "mongodb://127.0.0.1:27017/testdb";
const client = new MongoClient(dbUrl);

// Setting up the Express application
const app = express();
const port = process.env.PORT || 8080;

// Setting views and static file paths
app.set("views", path.join(__dirname, "templates"));
app.set("view engine", "pug");

// Middleware setup
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Defining routes for different pages and actions
app.get("/", async (request, response) => {
  let links = await getLinks();
  response.render("index", { title: "Home", menu: links });
});
app.get("/about", async (request, response) => {
  let links = await getLinks();
  response.render("about", { title: "About", menu: links });
});

// Admin menu routes for viewing, adding, editing, and deleting links
app.get("/admin/menu", async (request, response) => {
  let links = await getLinks();
  response.render("menu-list", { title: "Admin", menu: links });
});
app.get("/admin/menu/add", async (request, response) => {
  let links = await getLinks();
  response.render("menu-add", { title: "Add menu link", menu: links });
});
app.get("/admin/menu/edit", async (request, response) => {
  if (request.query.linkId) {
    let linkToEdit = await getSingleLink(request.query.linkId);
    let links = await getLinks();
    response.render("menu-edit", {
      title: "Edit menu link", menu: links,
      editLink: linkToEdit
    });
  } else {
    response.redirect("/admin/menu");
  }
});
app.post("/admin/menu/add/submit", async (request, response) => {
  let newLink = {
    weight: request.body.weight,
    path: request.body.path,
    name: request.body.name
  };
  await addLink(newLink);
  response.redirect("/admin/menu");
});
app.post("/admin/menu/edit/submit", async (request, response) => {
  let idFilter = { _id: new ObjectId(request.body.linkId) };

  let link = {
    weight: request.body.weight,
    path: request.body.path,
    name: request.body.name
  };

  try {
    await editLink(idFilter, link);
    response.redirect("/admin/menu");
  } catch (error) {
    console.error("Error updating link:", error);
    response.redirect(`/admin/menu/edit?linkId=${request.body.linkId}&error=Failed to update the link`);
  }
});

// Function to edit a link in the database
async function editLink(filter, link) {
  db = await connection();
  
  let update = {
    $set: link
  };

  const result = await db.collection("menuLinks").updateOne(filter, update);

  if (result.matchedCount === 0) {
    throw new Error("No link found with the provided linkId");
  }

  console.log("Link updated successfully");
}

// Route to delete a link
app.get("/admin/menu/delete", async (request, response) => {
  console.log(request.query.linkId);
  let id = request.query.linkId;
  await deleteLink(id);
  response.redirect("/admin/menu");
})

// Start the Express server
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

// Database connection function
async function connection() {
  db = client.db();
  return db;
}

// Function to retrieve all links from the database
async function getLinks() {
  db = await connection();
  let results = db.collection("menuLinks").find({});
  let resultArray = await results.toArray();
  return resultArray;
}

// Function to add a new link to the database
async function addLink(link) {
  db = await connection();
  let status = await db.collection("menuLinks").insertOne(link);
  console.log("link added");
}

// Function to delete a link from the database
async function deleteLink(id) {
  db = await connection();
  let query = { _id: new ObjectId(id) };
  let result = await db.collection("menuLinks").deleteOne(query);
}

// Function to retrieve a single link from the database
async function getSingleLink(id) {
  db = await connection();
  const editId = { _id: new ObjectId(id) };
  const result = await db.collection("menuLinks").findOne(editId);
  return result;
}
