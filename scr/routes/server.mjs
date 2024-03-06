import db from "../database/DB.mjs";
import UserResponse from "../models/userModel.mjs";

async function addUser(req, res) {
  
  try {
    // Creating a UserResponse instance from the received data
    
    const newUser = new db.User(req.body.username,req.body.email,req.body.city);
    newUser.save()
    res.json(true); // Send the response to the client
  } catch (error) {
    console.error("Error in getUser:", error);
    res.status(500).json({ error: "Internal server error" }); // Handle errors
  }
}
async function getUser(req, res) {
  try {
    const userId = req.body.id;
    const response = await db.getUser(userId); // Await the result of getUser
    console.log("User ID:", response);
    res.json(response); // Send the response to the client
  } catch (error) {
    console.error("Error in getUser:", error);
    res.status(500).json({ error: "Internal server error" }); // Handle errors
  }
}

export default {
  getUser,
  addUser,
};
