      import pg from "pg";
      import { readFileSync, readdirSync } from "fs";
      import { dirname, join } from "path";
      import config from "../configs/config.mjs";
      import { fileURLToPath } from 'url';

      const pool = new pg.Client(config.database)
      const __filename = fileURLToPath(import.meta.url);
      const __dirname = dirname(__filename);
      // Function to run SQL file=
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
    export default  async function connectToDatabase() {
        try {
          await pool.connect();
          console.log("Connected to the database");

          // Run your SQL files here
          const sqlDir = join(__dirname, "migrations");
          const sqlFiles = readdirSync(sqlDir);
          for (const file of sqlFiles) {
            await runSqlFile(join(sqlDir, file));
          }
        } catch (err) {
          console.error("Error connecting to the database:", err);
        }
      }

     