const express = require("express");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const PORT = 5000;

const Admin = require("./db/models/Admin");
const Course = require("./db/models/Course");
const Faculty = require("./db/models/Faculty");
const Student = require("./db/models/Student");

const connectToMongoose = require("./db/index");

app.use(cors());
app.use(express.json());

connectToMongoose();

app.get("/", (req, res) => {
  res.send("Hello IRIS");
});

app.listen(PORT, () => {
  console.log(`Server started at PORT: ${PORT}`);
});
