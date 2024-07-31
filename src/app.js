import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import sequelize from "./config/mysql.js";
import setupSwagger from './config/swagger.js';

import libraryRoutes from "./routes/libraryRoutes.js"

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

// Setup routes
app.get('/', (req, res) => {
    res.send('Root');
});
app.use("/api/v1/library", libraryRoutes());

// Setup Swagger
setupSwagger(app);

const { APP_PORT } = process.env || 3000;

app.listen(APP_PORT, () => {
    console.log(`Server is running on port ${APP_PORT}`);
});

// Connect to MySQL
sequelize
    .authenticate()
    .then(() => {
        console.log("Connected to MySQL");
    })
    .catch((err) => {
        console.error("Error connecting to MySQL:", err);
    });

