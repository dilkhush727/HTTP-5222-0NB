// Import required modules
const express = require("express"); 
const path = require("path"); 

// Initialize Express app
const app = express(); 

// Set the port (use environment variable or default to 8080)
const port = process.env.PORT || "8080"; 

// Set the directory for Pug templates
app.set("views", path.join(__dirname, "templates")); 

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

// Set Pug as the templating engine
app.set("view engine", "pug");

// Sample product data
const products = [
    {
        id: 1,
        name: 'Apple iPhone 16 Pro',
        description: 'This pre-owned product is not Apple certified, but has been professionally inspected, tested and cleaned by Amazon-qualified suppliers.',
        price: '$899',
        price_old: '$1199',
        delivery: 'Today',
        stock: '16',
        imageUrl: '/images/apple-16pro.webp',
        // Image sourced from Amazon. 
        // Amazon. (2025). Apple iPhone 16 Pro [Image]. Retrieved from https://m.media-amazon.com/images/I/71jL8s68fjL._AC_UY327_FMwebp_QL65_.jpg
    },
    {
        id: 2,
        name: 'Apple AirPods Max Wireless',
        description: 'Over-Ear Headphones, Active Noise Cancelling, Transparency Mode, Personalized Spatial Audio, Dolby Atmos, Bluetooth Headphones for iPhone, Sky Blue.',
        price: '$459',
        price_old: '$659',
        delivery: 'Tomorrow',
        stock: '10',
        imageUrl: '/images/apple-watch-ultra.jpg',
        // Image sourced from Amazon. 
        // Amazon. (2025). Apple AirPods Max Wireless [Image]. Retrieved from https://m.media-amazon.com/images/I/81jkMpNHVsL._AC_UY327_FMwebp_QL65_.jpg
    },
    {
        id: 3,
        name: 'Apple Watch Ultra',
        description: '[GPS + Cellular 49mm] Titanium Case with Midnight Ocean Band, One Size (Renewed).',
        price: '$425',
        price_old: '$725',
        delivery: 'Tomorrow',
        stock: '20',
        imageUrl: '/images/airpod-max-blue.jpg',
        // Image sourced from Amazon. 
        // Amazon. (2025). Apple Watch Ultra [Image]. Retrieved from https://m.media-amazon.com/images/I/810JR81LIsL._AC_UY327_FMwebp_QL65_.jpg
    }
];


// Home route (render 'index' template with a title and products list)
app.get("/", (request, response) => {
    // Render the 'index' template with products data
    response.render("index", { title: "Home", products: products });
});

// Product details route (dynamic route for product pages)
app.get("/product/:id", (request, response) => {
    // Get the product ID from the URL
    const productId = parseInt(request.params.id); 
    // Find the product based on the ID
    const product = products.find(p => p.id === productId); 
    
    if (product) {
        // If product is found, render the 'product' template with product details
        response.render("product", { title: product.name, product: product });
    } else {
        // If product is not found, respond with a 404 status and error message
        response.status(404).send("Product not found");
    }
});

// Start server and listen on the specified port
app.listen(port, () => {
    // Log when server starts successfully
    console.log(`Listening at http://localhost:${port}`); 
});
