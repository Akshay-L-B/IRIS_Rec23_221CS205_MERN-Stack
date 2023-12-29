const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  instructor: {
    type: String,
    required: true,
  },
  schedule: {
    type: String,
  },
  program_type: {
    type: [String],
    required: true,
  },
  department: {
    type: String,
    required: true,
  },
});

const Course = mongoose.model("course", courseSchema);
module.exports = Course;
