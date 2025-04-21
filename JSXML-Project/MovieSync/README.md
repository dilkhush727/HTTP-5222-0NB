Movie & TV Show Tracker
The Movie & TV Show Tracker is a web application that allows users to discover movies and TV shows, view detailed information (ratings, synopsis, cast), and find out where to stream them legally. It combines data from TMDb for movie/show metadata and Watchmode for streaming availability.

Features
   - Search for movies and TV shows
   - Trending movies and shows on the home page
   - View detailed information including rating, cast, and synopsis
   - Find where to stream (Netflix, Prime, Hulu, etc.)
   - Dark mode for comfortable browsing
   - Fully responsive UI built with Bootstrap

Technology Stack
   Frontend
      - HTML5, CSS3
      - Bootstrap (with Dark Mode)
      - EJS or Pug templating engine
   Backend
      - Node.js
      - Express.js

APIs & Data Sources
   - TMDb API
     Used for movie/show metadata including titles, ratings, genres, cast, and synopses.

   - Watchmode API
     Offers streaming availability (subscription, rent, purchase), plus additional metadata like critic scores and streaming links.

Pages Overview
   Home Page
      - Search bar for quick lookups
      - Display trending movies and shows
      - Highlight popular streaming platforms

   Search Results Page
      - Displays matching titles with posters and ratings

   Details Page
      - Synopsis, rating, genre, cast
      - Streaming options (platforms and availability)