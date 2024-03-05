import db from "../database/DB.mjs";

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

export default getUser;
