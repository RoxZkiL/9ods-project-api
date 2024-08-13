require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/auth", authRoutes);

// app.get("/", (req, res) => {
//   res.status(200).json("Home Page Test");
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server Running on Port ${PORT}`);
});
