
import express from 'express';
import bodyParser from 'body-parser';
import db from "./database/DB.mjs";
import server from "./routes/server.mjs"

db.connectToDatabase();
const app = express();
const PORT = 5000;
app.use(bodyParser.json());

app.get('/api/user/',server.getUser);
app.post('/api/addUser/',server.addUser)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});