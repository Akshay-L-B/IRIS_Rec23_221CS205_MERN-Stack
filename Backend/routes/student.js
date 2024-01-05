const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtPassword = "secretsCantBeRevealed";
const Student = require("../db/models/Student");
const {
  signupMiddleware,
  loginStudentMiddleware,
} = require("../middleware/user");

//Must do input validation yet

router.post("/signup", signupMiddleware, async (req, res) => {
  try {
    let student = await Student.findOne({ email: req.body.email });
    if (student) {
      res.status(401).send("Email already taken");
      console.log(student);
      return;
    }
    const payloadObject = {
      email: req.body.email,
      role: req.body.role,
    };
    // Another syntax for create:
    // student.create(req.body);
    student = new Student(req.body);
    await student.save();
    const token = jwt.sign(payloadObject, jwtPassword);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Could not login", error.message);
    res.status(500).send("Could not save student");
  }
});

//ROUTE 2 : Login using POST: Doesn't require auth (jwt), returns a jwt
router.post("/login", loginStudentMiddleware, async (req, res) => {
  const payloadObject = {
    email: req.body.email,
    role: "student",
  };

  try {
    const token = jwt.sign(payloadObject, jwtPassword);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
