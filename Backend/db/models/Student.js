const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
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
  program_type: {
    type: String,
    required: true,
  },
  student_id: {
    type: String,
    required: true,
    unique: true,
  },
});

const Student = mongoose.model("student", studentSchema);
module.exports = Student;
