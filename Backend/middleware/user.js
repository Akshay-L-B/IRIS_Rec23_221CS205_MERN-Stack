//Here we are validating the inputs as well as hashing the password using bcryptjs

// const zod = require("zod");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Student = require("../db/models/Student");
const Faculty = require("../db/models/Faculty");
const Admin = require("../db/models/Admin");
const jwtPassword = "secretsCantBeRevealed";

// const signupSchema = zod.object({
//   name: zod.string().min(3),
//   email: zod.string().email(),
//   password: zod.string().min(6),
// });
// const loginSchema = zod.object({
//   email: zod.string().email(),
//   password: zod.string().min(6),
// });

const signupMiddleware = async (req, res, next) => {
  try {
    // const user = req.body;
    // const result = signupSchema.safeParse(user);
    // safeParse returns two things success and data if true, success and error if false
    if (req.body) {
      // const salt = await bcrypt.genSalt(10); // returns a promise hence await
      //bcrypt.hash automatically adds a salt to the password, hence no need of storing the salt in the database, if not we had to store the salt in db cuz while login, it needs the salt part to compare
      const saltLength = 10;
      const secPass = await bcrypt.hash(req.body.password, saltLength);
      req.body.password = secPass; // assign the req password to hashed password
      next();
    } else {
      console.error(
        "Invalid credentials",
        result.error.errors.map((e) => e.message)
      );
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error("Error occured in signup of user", error.message);
    res.status(500).send("Some internal error occured");
  }
};

const loginStudentMiddleware = async (req, res, next) => {
  try {
    // const user = req.body;
    // const result = loginSchema.safeParse(user);
    if (req.body) {
      const foundUser = await Student.findOne({ email: req.body.email });
      if (foundUser) {
        const validUser = await bcrypt.compare(
          req.body.password,
          foundUser.password
        );
        if (validUser) next();
        else {
          console.log("Invalid credentials");
          res.status(401).send("Invalid credentials");
        }
      } else {
        console.log("Invalid credentials");
        res.status(401).send("Invalid credentials");
      }
    } else {
      console.error(
        "Invalid credentials",
        result.error.errors.map((e) => e.message)
      );
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error("Error occured in zod of user", error.message);
    res.status(500).send("Some internal error occured");
  }
};

//Main middleware for checking the jwt of the user
const validateStudentUser = async (req, res, next) => {
  const token = req.headers.authorization;
  //verify token and call its callback fn where first arg is err, second is decoded payload
  jwt.verify(token, jwtPassword, async (err, decodedToken) => {
    if (err) {
      console.error("Unauthorized user: ", err.message);
      res.status("401").send("Unauthorized user");
    } else {
      const user = await Student.findOne({ email: decodedToken.email }).select(
        //This gives complete details of user in db except password
        "-password" //dash is minus
      );
      req.user = user;
      next();
    }
  });
};

const loginFacultyMiddleware = async (req, res, next) => {
  try {
    // const user = req.body;
    // const result = loginSchema.safeParse(user);
    if (req.body) {
      const foundUser = await Faculty.findOne({ email: req.body.email });
      if (foundUser) {
        const validUser = await bcrypt.compare(
          req.body.password,
          foundUser.password
        );
        if (validUser) next();
        else {
          console.log("Invalid credentials");
          res.status(401).send("Invalid credentials");
        }
      } else {
        console.log("Invalid credentials");
        res.status(401).send("Invalid credentials");
      }
    } else {
      console.error(
        "Invalid credentials",
        result.error.errors.map((e) => e.message)
      );
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error("Error occured in zod of user", error.message);
    res.status(500).send("Some internal error occured");
  }
};

//Main middleware for checking the jwt of the user
const validateFacultyUser = async (req, res, next) => {
  const token = req.headers.authorization;
  //verify token and call its callback fn where first arg is err, second is decoded payload
  jwt.verify(token, jwtPassword, async (err, decodedToken) => {
    if (err) {
      console.error("Unauthorized user: ", err.message);
      res.status("401").send("Unauthorized user");
    } else {
      const user = await Faculty.findOne({ email: decodedToken.email }).select(
        //This gives complete details of user in db except password
        "-password" //dash is minus
      );
      req.user = user;
      req.body.instructor = user.name; //Set the faculty name as instructor
      next();
    }
  });
};

const loginAdminMiddleware = async (req, res, next) => {
  try {
    // const user = req.body;
    // const result = loginSchema.safeParse(user);
    if (req.body) {
      const foundUser = await Admin.findOne({ email: req.body.email });
      if (foundUser) {
        const validUser = await bcrypt.compare(
          req.body.password,
          foundUser.password
        );
        if (validUser) next();
        else {
          console.log("Invalid credentials");
          res.status(401).send("Invalid credentials");
        }
      } else {
        console.log("Invalid credentials");
        res.status(401).send("Invalid credentials");
      }
    } else {
      console.error(
        "Invalid credentials",
        result.error.errors.map((e) => e.message)
      );
      res.status(401).send("Invalid credentials");
    }
  } catch (error) {
    console.error("Error occured in zod of user", error.message);
    res.status(500).send("Some internal error occured");
  }
};

//Main middleware for checking the jwt of the user
const validateAdminUser = async (req, res, next) => {
  const token = req.headers.authorization;
  //verify token and call its callback fn where first arg is err, second is decoded payload
  jwt.verify(token, jwtPassword, async (err, decodedToken) => {
    if (err) {
      console.error("Unauthorized user: ", err.message);
      res.status("401").send("Unauthorized user");
    } else {
      const user = await Admin.findOne({ email: decodedToken.email }).select(
        //This gives complete details of user in db except password
        "-password" //dash is minus
      );
      req.user = user;
      next();
    }
  });
};

module.exports = {
  signupMiddleware,
  loginStudentMiddleware,
  validateStudentUser,
  loginAdminMiddleware,
  validateAdminUser,
  loginFacultyMiddleware,
  validateFacultyUser,
};
