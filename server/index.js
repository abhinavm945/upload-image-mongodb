import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import colors from "colors";
import mongoose from "mongoose";
import uploadRoutes from "./routes/uploadRoutes.js"; // Import the upload routes
import galleryRoutes from "./routes/galleryRoutes.js";

const PORT = 8080;
const app = express();

// middlewares
configDotenv();
app.use(express.json());
app.use(cors());

// Use the upload route
app.use("/api/upload", uploadRoutes);
app.use("/api/gallery", galleryRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log(" connected to mongo db ".bgGreen.black);
  })
  .catch((error) => {
    console.log(" error connecting to mongo db ".bgRed.white, error);
  });

// Starting the server on port
app.listen(PORT, () => {
  console.log(` Server is listening to the port ${PORT} `.bgCyan.black);
});
