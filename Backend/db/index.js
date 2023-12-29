const mongoose = require("mongoose");

async function connectToMongoose() {
  await mongoose.connect(
    "mongodb+srv://akshaylb:Akshay12345@cluster0.dxdtryg.mongodb.net/IRIS_Course_Registration"
  );
  console.log("Connected to MongoDB database");
}

module.exports = connectToMongoose;
