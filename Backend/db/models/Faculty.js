const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

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
  role: {
    type: String,
    default: "faculty",
  },
});

// Add Passport Local Mongoose plugin
// facultySchema.plugin(passportLocalMongoose, {
//   usernameField: "email", // Specify the field to use for username (email in this case)
// });

const Faculty = mongoose.model("faculty", facultySchema);
module.exports = Faculty;
