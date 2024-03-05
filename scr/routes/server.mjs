import db from "../database/DB.mjs";
import UserResponse from "../models/userModel";
// Assuming you receive user data from the API
const userDataFromAPI = {
  id: 1,
  username: "john_doe",
  email: "john@example.com",
  city: "New York",
};

async function getUser(req, res) {
  try {
    const userId = req.query.id;
    const response = await db.getUser(userId); // Await the result of getUser
    console.log("User ID:", response.row[0]);
    res.json(response); // Send the response to the client
  } catch (error) {
    console.error("Error in getUser:", error);
    res.status(500).json({ error: "Internal server error" }); // Handle errors
  }
}
async function addUser(req, res) {
  const newUser = new db.User(userData.username, userData.email,userData.city);
  try {
    // Creating a UserResponse instance from the received data
    const userResponse = new UserResponse(
      userDataFromAPI.username,
      userDataFromAPI.email,
      userDataFromAPI.city
    );
    newUser.save
    console.log(userResponse);
    res.json(true); // Send the response to the client
  } catch (error) {
    console.error("Error in getUser:", error);
    res.status(500).json({ error: "Internal server error" }); // Handle errors
  }
}
export default {
  getUser,
  addUser,
};
