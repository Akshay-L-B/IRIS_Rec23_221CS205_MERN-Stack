const express = require("express");
const router = express.Router();
const Course = require("../db/models/Course");
const { checkRole, validateUser } = require("../middleware/checkRole");

// ROUTE 1 : To create a new course : requires auth
router.post(
  "/create",
  checkRole(["admin", "faculty"]),
  validateUser,
  async (req, res) => {
    try {
      const {
        courseCode,
        courseTitle,
        instructor,
        schedule,
        credits,
        department,
        program_type,
        prerequisites,
      } = req.body;
      if (req.role === "faculty" && req.user.department !== department) {
        return res
          .status(401)
          .send("Faculty cannot add courses of other department");
      }
      // Check if the course with the given courseCode already exists
      const existingCourse = await Course.findOne({ courseCode });
      if (existingCourse) {
        return res
          .status(400)
          .json({ message: "Course with this code already exists" });
      }

      // Create a new course
      const newCourse = new Course({
        courseCode,
        courseTitle,
        instructor,
        schedule,
        credits,
        department,
        program_type,
        prerequisites,
      });

      // Save the new course to the database
      await newCourse.save();

      res.status(201).json({ message: "Course created successfully" });
    } catch (error) {
      console.error("Error creating course:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

//ROUTE 2 : To edit a new course using course code as query parameter: requires auth
router.put(
  "/editCourse/:courseCode",
  checkRole(["admin", "faculty"]),
  validateUser,
  async (req, res) => {
    try {
      const {
        courseTitle,
        instructor,
        schedule,
        credits,
        program_type,
        prerequisites,
      } = req.body;

      courseCode = req.params.courseCode.replace(":", "");

      // Check if the course with the given courseCode already exists
      const foundCourse = await Course.findOne({ courseCode });
      if (!foundCourse) {
        return res
          .status(400)
          .json({ message: "Course with this code does not exists" });
      }

      // Edit the course
      const updatedCourse = {
        courseTitle,
        instructor,
        schedule,
        credits,
        program_type,
        prerequisites,
      };

      // Find the course with id and Update the course
      const courseIfUpdated = await Course.findByIdAndUpdate(
        foundCourse._id,
        { $set: updatedCourse },
        { new: true }
      );
      if (courseIfUpdated) {
        console.log("updated course: ", courseIfUpdated);
        res.status(200).json(courseIfUpdated);
      } else {
        res.status(404).send("Course with that code not found");
      }
    } catch (error) {
      console.error("Error editing course:", error);
      res.status(500).json({ message: "Could not edit the course" });
    }
  }
);

//ROUTE 3 : Delete a course using DELETE : requires auth
router.delete(
  "/deleteCourse/:id",
  checkRole[("admin", "faculty")],
  validateUser,
  async (req, res) => {
    const courseID = req.params.id;
    const foundCourse = await Course.findById(courseID);
    try {
      const deletedCourse = await Course.findByIdAndDelete(foundCourse._id);
      res.status(200).json({ deletedCourse });
    } catch (error) {
      console.error("could not delete:", error.message);
      res.send("could not delete:");
    }
  }
);

//ROUTE 4 : Fetch all courses : no auth required
router.get("/getAllCourses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json({ "All Courses": courses });
  } catch (error) {
    console.error("Error displaying courses");
    res.status(500).json("Error displaying courses");
  }
});

//ROUTE 5 : Get a student's department course which is not enrolled: requires auth
router.get("/getDepartmentCourses", validateStudentUser, async (req, res) => {
  try {
    const department = req.user.department;
    const coursesNotEnrolled = await Course.find({
      department: department,
      _id: { $nin: req.user.enrolledCourses },
    });

    res.status(200).json({ "Available Courses": coursesNotEnrolled });
  } catch (error) {
    console.error("Error displaying courses: ", error.message);
    res.status(500).json("Error displaying courses");
  }
});

//ROUTE 6 : To search for courses by code, title, or department
router.get("/search", async (req, res) => {
  try {
    const { courseCode, courseTitle, department } = req.query;

    // Construct the search query based on the provided parameters
    const searchQuery = {};

    if (courseCode) {
      searchQuery.courseCode = courseCode;
    }

    if (courseTitle) {
      searchQuery.courseTitle = courseTitle;
    }

    if (department) {
      searchQuery.department = department;
    }

    // Execute the search query
    const courses = await Course.find(searchQuery);

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error searching for courses:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//ROUTE  : View enrolled students of a particular course:
router.get("/");

module.exports = router;
