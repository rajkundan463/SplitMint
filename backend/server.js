require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const routes = require("./src/routes"); 
const authMiddleware = require("./src/modules/auth/auth.middleware");

const app = express();

app.use(helmet());          
app.use(cors());            
app.use(morgan("dev"));     
app.use(express.json());    

app.get("/api/v1/protected", authMiddleware, (req, res) => {
  res.status(200).json({
    message: "Protected route accessed successfully",
    user: req.user, 
  });
});


app.use("/api/v1", routes); 


app.get("/api/v1/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
  });
});


app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    error: "Internal Server Error",
  });
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});