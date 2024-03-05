import pg from "pg";
import { readFileSync, readdirSync } from "fs";
import { dirname, join } from "path";
import config from "../configs/config.mjs";
import { fileURLToPath } from "url";

const pool = new pg.Client(config.database);

async function runSqlFile(filePath) {
  try {
    const sql = readFileSync(filePath, "utf8");
    await pool.query(sql);
    console.log(`Successfully executed SQL file: ${filePath}`);
  } catch (err) {
    console.error(`Error executing SQL file ${filePath}: ${err}`);
  }
}
async function getUser(_id) {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [_id]);
    return result.rows[0]; // Assuming you expect only one user with the given id
  } catch (error) {
    console.error("Error in getUser:", error);
    throw error; // Propagate the error to the caller
  }
}

async function connectToDatabase() {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  try {
    await pool.connect();
    console.log("Connected to the database");

    const sqlDir = join(__dirname, "migrations");
    const sqlFiles = readdirSync(sqlDir);
    for (const file of sqlFiles) {
      await runSqlFile(join(sqlDir, file));
    }
  } catch (err) {
    console.error("Error connecting to the database:", err);
  }
}
export default {
  getUser,
  connectToDatabase,
};
