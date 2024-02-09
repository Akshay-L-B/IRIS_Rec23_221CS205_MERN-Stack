import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseTable from "./CourseTable";

const AvailableCourses = () => {
  const [courses, setCourses] = useState([]);
  const host = "http://localhost:5000";
  let navigate = useNavigate();

  useEffect(() => {
    // Fetch available courses from your backend API
    const fetchCourses = async () => {
      try {
        if (localStorage.getItem("token")) {
          const response = await fetch(`${host}/course/getDepartmentCourses`, {
            method: "GET",
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("token"),
            },
          }); // Replace with your actual API endpoint
          const data = await response.json();
          setCourses(data);
          console.log(data);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses(); //eslint-disable-next-line
  }, []); // The empty dependency array ensures that this effect runs once after the initial render

  return (
    <div>
      <CourseTable courses={courses} />
    </div>
  );
};

export default AvailableCourses;
