import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import SelectRole from "./components/SelectRole";
import StudentSignup from "./components/StudentSignup";
import StudentDashboard from "./components/StudentDashboard";
import FacultySignup from "./components/FacultySignup";
import AdminSignup from "./components/AdminSignup";
import Apply from "./components/Apply";
import Cart from "./components/Cart";
import Profile from "./components/Profile";
import FacultyDashboard from "./components/FacultyDashboard";

const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SelectRole />} />
        <Route path="/student/login" element={<Login userType="student" />} />
        <Route path="/faculty/login" element={<Login userType="faculty" />} />
        <Route path="/admin/login" element={<Login userType="admin" />} />
        <Route
          path="/student/signup"
          element={<StudentSignup userType="student" />}
        />
        <Route
          path="/faculty/signup"
          element={<FacultySignup userType="faculty" />}
        />
        <Route
          path="/admin/signup"
          element={<AdminSignup userType="admin" />}
        />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/student/apply" element={<Apply />} />
        <Route path="/student/cart" element={<Cart />} />
        <Route path="/student/profile" element={<Profile />} />
        <Route path="/faculty/dasboard" element={<FacultyDashboard />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
