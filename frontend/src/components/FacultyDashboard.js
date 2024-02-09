import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const FacultyDashboard = () => {
  let location = useLocation();
  let navigate = useNavigate();
  return (
    <div>
      <nav className="bg-white shadow dark:bg-gray-800">
        <div className="container flex items-center justify-center p-6 mx-auto text-gray-600 capitalize dark:text-gray-300">
          <Link
            to="/faculty/dashboard"
            className={
              location.pathname === "/faculty/dasboard"
                ? "text-gray-800 transition-colors duration-300 transform dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6"
                : "border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
            }
          >
            Home
          </Link>

          <Link
            to="/faculty/create-course"
            className={
              location.pathname === "/faculty/create-course"
                ? "text-gray-800 transition-colors duration-300 transform dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6"
                : "border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
            }
          >
            Create course
          </Link>

          <Link
            to="/faculty/profile"
            className={
              location.pathname === "/faculty/profile"
                ? "text-gray-800 transition-colors duration-300 transform dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6"
                : "border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
            }
          >
            Profile
          </Link>
          <Link
            to="/faculty/mycourses"
            className={
              location.pathname === "/faculty/mycourses"
                ? "text-gray-800 transition-colors duration-300 transform dark:text-gray-200 border-b-2 border-blue-500 mx-1.5 sm:mx-6"
                : "border-b-2 border-transparent hover:text-gray-800 transition-colors duration-300 transform dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6"
            }
          >
            My Courses
          </Link>
          <button
            class="px-3 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 mx-30 ml-auto"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
};

export default FacultyDashboard;
