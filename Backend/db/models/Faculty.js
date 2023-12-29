const mongoose = require("mongoose");

const facultySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
  staff_id: {
    type: String,
    required: true,
    unique: true,
  },
});

const Faculty = mongoose.model("faculty", facultySchema);
module.exports = Faculty;
