import express from "express";
import dotenv from 'dotenv';
import { connectDB } from "./config/db.js";
import notesRoutes from './routes/notes.routes.js';
import userRoutes from './routes/users.routes.js';

dotenv.config();

const app = express();

app.use(express.json()); //allows to use json data in req body

app.use("/api/notes", notesRoutes);
app.use("/api/users", userRoutes);

app.listen(5000, () => {
    connectDB();
    console.log('Server started at http://localhost:5000')
});