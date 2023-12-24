const express = require("express");
const cors = require("cors")
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const routes = require("../BE-login-signup/routes/routes")

dotenv.config();
const app = express();

app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}));
app.use(cookieParser()); //tạo cookie và gắn cookie
app.use(express.json()); //request dưới dạng js hết

mongoose.connect(process.env.mongobd_url)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use( "/api", routes)
app.use((err, req, res, next)=>{
  const statusCode = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(statusCode).json({
    success: false,
    status: statusCode,
    message: errorMessage,
    stack: err.stack
  });
});

app.listen(8080, () => {
    console.log("Server is running");
}
);