const express = require('express');
const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom'); // For parsing XML data
const app = express();

// Set up Pug as the view engine
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// Root route: List library branches
app.get('/', (req, res) => {
  // Load and parse the KML data
  fs.readFile(path.join(__dirname, 'public', 'library-branch-locations.kml'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading KML data');
    }

    // Parse KML as XML using jsdom
    const dom = new JSDOM(data);
    const document = dom.window.document;

    // Extract Placemark elements (library branches)
    const placemarks = document.querySelectorAll('Placemark');
    const branches = Array.from(placemarks).map(placemark => {
      const name = placemark.querySelector('name').textContent;
      const description = placemark.querySelector('description') ? placemark.querySelector('description').textContent : 'No description available';
      const id = placemark.getAttribute('id');
      return { name, description, id };
    });

    // Render the home page with the branches data
    res.render('index', { title: 'Libraries', branches });
  });
});

// Route to view a single library branch by id
app.get('/library/:id', (req, res) => {
    const branchId = req.params.id;
  
    // Load and parse the KML data
    fs.readFile(path.join(__dirname, 'public', 'library-branch-locations.kml'), 'utf8', (err, data) => {
      if (err) {
        return res.status(500).send('Error reading KML data');
      }
  
      // Parse KML as XML using jsdom
      const dom = new JSDOM(data);
      const document = dom.window.document;
  
      // Find the Placemark by id
      const placemark = document.querySelector(`#${branchId}`);
      if (!placemark) {
        return res.status(404).send('Branch not found');
      }
  
      // Extract details for the library branch
      const name = placemark.querySelector('name').textContent;
      const description = placemark.querySelector('description') ? placemark.querySelector('description').textContent : 'No description available';
      const address = placemark.querySelector('address') ? placemark.querySelector('address').textContent : 'No address available';
      const phone = placemark.querySelector('phone') ? placemark.querySelector('phone').textContent : 'No phone number available';
  
      // Check if branch data exists and is valid
      const branch = { name, description, address, phone };
  
      // Pass the branch data to the 'library.pug' template
      res.render('library', { branch });
    });
  });
  

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
