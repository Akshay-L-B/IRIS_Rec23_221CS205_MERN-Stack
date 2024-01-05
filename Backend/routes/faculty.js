const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtPassword = "secretsCantBeRevealed";
const {
  signupMiddleware,
  loginFacultyMiddleware,
  validateFacultyUser,
} = require("../middleware/user");

const Faculty = require("../db/models/Faculty");
const { validateUser } = require("../middleware/checkRole");
const Course = require("../db/models/Course");
const Student = require("../db/models/Student");

router.post("/signup", signupMiddleware, async (req, res) => {
  try {
    let faculty = await Faculty.findOne({ email: req.body.email });
    if (faculty) {
      res.status(401).send("Email already taken");
      console.log(faculty);
      return;
    }
    const payloadObject = {
      email: req.body.email,
      role: req.body.role,
    };
    // Another syntax for create:
    // faculty.create(req.body);
    faculty = new Faculty(req.body);
    await faculty.save();
    const token = jwt.sign(payloadObject, jwtPassword);
    res.status(200).json({ token });
  } catch (error) {
    console.error("Could not login", error.message);
    res.status(500).send("Could not save faculty");
  }
});

//ROUTE 2 : Login using POST: Doesn't require auth (jwt), returns a jwt
router.post("/login", loginFacultyMiddleware, async (req, res) => {
  const payloadObject = {
    email: req.body.email,
    role: "faculty",
  };

  try {
    const token = jwt.sign(payloadObject, jwtPassword);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Some error occured");
  }
});

//ROUTE 3 : View my courses
router.get("/getMyCourses", validateUser, async (req, res) => {
  try {
    const myCourses = await Course.find({ instructor: req.user.name });
    res.status(200).json(myCourses);
  } catch (error) {
    console.error("Error getting my courses: ", error.message);
    res.status(500).send("Error getting my courses");
  }
});

router.put("/approveStudent", validateUser, async (req, res) => {
  try {
    const { courseId, studentId } = req.body;
    // Check if the student and course exist
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).json({ message: "Student or course not found" });
    }
    const approved = await Course.findByIdAndUpdate(
      courseId,
      {
        $pull: { requestedStudents: studentId },
        $addToSet: { assignedStudents: studentId },
      },
      { new: true } // Return the updated course document
    );
    res.status(200).json(approved);
  } catch (error) {
    console.error("Error approving: ", error.message);
    res.status(500).send("Some error occured");
  }
});

module.exports = router;
