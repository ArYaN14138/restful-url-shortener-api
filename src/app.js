const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const urlRoutes = require("./routes/urlRoutes");

dotenv.config();

connectDB();

const app = express();

app.use(express.json());

app.use("/", urlRoutes);

app.get("/", (req, res) => {
  res.send("URL Shortener API Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});