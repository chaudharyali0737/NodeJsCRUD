// Importing the HTTP module
import { createServer } from "http";
// import { connectToDatabase } from '../database/DB.js';  // Add .js extension if necessary
import * as d1 from "../database/DB.js";

// Connect to the database
d1.connectToDatabase();
// Define the port
const port = 5000;

// Create a server instance
const server = createServer((req, res) => {
  // Check the requested URL
  if (req.url === "/") {
    // If the root URL is requested, send a welcome message
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to my server!");
  } else {
    // If the requested URL is not found, send a 404 error
    res.writeHead(404);
    res.end("404 Not Found");
  }
});

// Start the server
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
