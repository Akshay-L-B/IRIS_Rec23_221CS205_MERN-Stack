import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import AvailableCourses from "./AvailableCourse";

const StudentDashboard = () => {
  let navigate = useNavigate();
  if (localStorage.getItem("token")) {
    return (
      <div>
        <Navbar />
        <AvailableCourses />
      </div>
    );
  } else {
    navigate("/");
  }
};

export default StudentDashboard;
