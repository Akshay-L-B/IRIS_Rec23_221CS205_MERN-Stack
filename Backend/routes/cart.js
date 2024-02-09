const express = require("express");
const router = express.Router();
const Cart = require("../db/models/Cart");
const Course = require("../db/models/Course");
const Student = require("../db/models/Student");
const { validateUser, assignRole } = require("../middleware/checkRole");

// Set the dead line here
const deadline = new Date("2023-01-31");

// ROUTE 1 : To add a course to the student's cart
router.post("/add-to-cart", assignRole, validateUser, async (req, res) => {
  try {
    const studentId = req.user._id;
    const { courseId } = req.body;

    // Check if the student and course exist
    const student = await Student.findById(studentId);
    const course = await Course.findById(courseId);

    if (!student || !course) {
      return res.status(404).json({ message: "Student or course not found" });
    }

    // Check if the student already has a cart
    let cart = await Cart.findOne({ student: studentId });

    // If the student doesn't have a cart, create one
    if (!cart) {
      cart = new Cart({ student: studentId, courses: [] });
    }

    // Add the course to the cart
    cart.courses.push(courseId);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ message: "Course added to the cart successfully" });
  } catch (error) {
    console.error("Error adding course to cart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Endpoint to finalize enrollment using courses in the cart
router.post(
  "/finalize-enrollment",
  assignRole,
  validateUser,
  async (req, res) => {
    try {
      const studentId = req.user._id;

      // Retrieve the student's cart
      const cart = await Cart.findOne({ student: studentId });

      if (!cart) {
        return res.status(404).json({ message: "Your cart is empty!" });
      }

      // Retrieve the enrolled courses from the cart
      const enrolledCourses = cart.courses;
      enrolledCourses.map(async (course) => {
        await Course.findByIdAndUpdate(course._id, {
          $push: { requestedStudents: studentId },
        });
      });

      // Retrieve the student
      // const student = await Student.findById(studentId);

      // if (!student) {
      //   return res.status(404).json({ message: "Student not found" });
      // }

      // // Add the enrolled courses to the student's enrolledCourses field
      // student.enrolledCourses = student.enrolledCourses.concat(enrolledCourses);

      // // Save the updated student
      // await student.save();

      // Clear the courses from the cart after enrollment
      cart.courses = [];
      await cart.save();

      res.status(200).json({ message: "Enrollment completed successfully" });
    } catch (error) {
      console.error("Error finalizing enrollment:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

//ROUTE 3 : Delete from cart : requires auth
router.delete(
  "/remove-from-cart",
  assignRole,
  validateUser,
  async (req, res) => {
    try {
      const studentId = req.user._id;
      const { courseId } = req.body;

      // Check if the student and course exist
      const student = await Student.findById(studentId);
      const course = await Course.findById(courseId);

      if (!student || !course) {
        return res.status(404).json({ message: "Student or course not found" });
      }

      // Check if the student has a cart
      const cart = await Cart.findOne({ student: studentId });

      if (!cart) {
        return res
          .status(404)
          .json({ message: "Cart not found for the student" });
      }

      // Remove the course from the cart
      cart.courses = cart.courses.filter(
        (cartCourseId) => cartCourseId.toString() !== courseId
      );

      // Save the updated cart
      await cart.save();

      res
        .status(200)
        .json({ message: "Course removed from the cart successfully" });
    } catch (error) {
      console.error("Error removing course from cart:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
);

//ROUTE 4 : Drop a course before deadline using DELETE : requires auth
router.delete("/drop-course", async (req, res) => {
  try {
    const { studentId, courseId } = req.body;

    // Check if the student and course exist
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    // Check if the course is enrolled by the student
    const isEnrolled = student.enrolledCourses.includes(courseId);

    if (!isEnrolled) {
      return res
        .status(400)
        .json({ message: "Student is not enrolled in the specified course" });
    }

    // Current date
    const currentDate = new Date();

    // Compare the current date with the deadline
    const hasDeadlinePassed = currentDate > deadline;

    if (hasDeadlinePassed) {
      return res.status(400).json({ message: "Drop deadline has passed" });
    }

    // Drop the course from the enrolledCourses array
    student.enrolledCourses = student.enrolledCourses.filter(
      (enrolledCourseId) => enrolledCourseId.toString() !== courseId
    );

    // Save the updated student
    await student.save();

    res.status(200).json({ message: "Course dropped successfully" });
  } catch (error) {
    console.error("Error dropping course:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//ROUTE to display all the cart courses
router.get("/showCart", assignRole, validateUser, async (req, res) => {
  try {
    const studentId = req.user._id.toString();

    // Find the cart for the logged-in student
    const cart = await Cart.findOne({ student: studentId });

    if (!cart) {
      return res
        .status(404)
        .json({ message: "Cart not found for the student" });
    }

    const cartCoursesIds = cart.courses;
    const courses = await Course.find({ _id: { $in: cartCoursesIds } });

    res.status(200).json(courses);
  } catch (error) {
    console.error("Error fetching courses from cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
