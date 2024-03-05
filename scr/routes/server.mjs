
import { createServer } from "http";
import connectToDatabase from "../database/DB.mjs";

connectToDatabase();
const port = 5000;
const server = createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to my server!");
  } else {
    res.writeHead(404);
    res.end("404 Not Found");
  }
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
