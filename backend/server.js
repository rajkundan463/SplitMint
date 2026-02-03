require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const routes = require("./src/routes"); 
const authMiddleware = require("./src/modules/auth/auth.middleware");

const app = express();


// GLOBAL MIDDLEWARE 
app.use(helmet());          // Security headers
app.use(cors());            // Allow cross-origin
app.use(morgan("dev"));     // Logging
app.use(express.json());    // Parse JSON bodies


// Protected Test Route
app.get("/api/v1/protected", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed successfully",
    user: req.user, // injected by middleware
  });
});


// ROUTES 
// Auth Routes
app.use("/api/v1", routes);   // ⭐ ONE CLEAN ENTRY POINT


// HEALTH CHECK ROUTE
app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
  });
});


// GLOBAL ERROR HANDLER 
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: "Internal Server Error",
  });
});


//Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});