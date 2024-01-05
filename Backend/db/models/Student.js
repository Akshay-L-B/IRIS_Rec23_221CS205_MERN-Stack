const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

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
  enrolledCourses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  role: {
    type: String,
    default: "student",
  },
});

// Add Passport Local Mongoose plugin
// studentSchema.plugin(passportLocalMongoose, {
//   usernameField: "email", // Specify the field to use for username (email in this case)
// });

const Student = mongoose.model("student", studentSchema);
module.exports = Student;
