const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/auth", (req, res) => {
  res.status(200).json("HOLAS PROBANDO SERVIDOR");
});

app.listen(3000, () => {
  console.log("Server Running on Port 3000");
});
