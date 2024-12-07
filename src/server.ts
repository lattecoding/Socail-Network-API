import express from "express";
import db from "./config/connection.js";
import routes from "./routes/index.js";

const PORT = process.env.PORT || 3001; // Optionally use environment variable for port
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// Initialize database connection and start the server
(async () => {
  try {
    await db(); // Connect to the database
    app.listen(PORT, () => {
      console.log(`API server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1); // Ensure server fails properly if database connection fails
  }
})();
