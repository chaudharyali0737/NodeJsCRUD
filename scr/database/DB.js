import { Pool } from "pg";
import { readFileSync, readdirSync } from "fs";
import { join } from "path";
import dbConfig from "../configs/config";

const pool = new Pool(dbConfig);

// Function to run SQL file
async function runSqlFile(filePath) {
  try {
    const sql = readFileSync(filePath, "utf8");
    await pool.query(sql);
    console.log(`Successfully executed SQL file: ${filePath}`);
  } catch (err) {
    console.error(`Error executing SQL file ${filePath}: ${err}`);
  }
}

// Function to connect to the database
export default async function ConnectToDatabase() {
  try {
    await pool.connect();
    console.log("Connected to the database");

    // Run your SQL files here
    const sqlDir = join(__dirname, "scr/database/migrations");
    const sqlFiles = readdirSync(sqlDir);
    for (const file of sqlFiles) {
      await runSqlFile(join(sqlDir, file));
    }
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
}

// module.exports = {
//   connectToDatabase,
// };
