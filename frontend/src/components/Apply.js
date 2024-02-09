import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";
import Navbar from "./Navbar";

const Apply = () => {
  const [courses, setCourses] = useState([]);
  const context = useContext(UserContext);
  const { addToCart } = context;
  const host = "http://localhost:5000";
  let navigate = useNavigate();

  useEffect(() => {
    // Fetch available courses from your backend API
    const fetchCourses = async () => {
      try {
        if (localStorage.getItem("token")) {
          const response = await fetch(`${host}/course/getAvailableCourses`, {
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
      <Navbar />
      <section className="container px-4 mx-auto my-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Select courses to add to your cart
        </h2>
        <div className="flex flex-col mt-6">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
              <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <button className="flex items-center gap-x-3 focus:outline-none">
                          <span>Course code</span>
                        </button>
                      </th>

                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Course Title
                      </th>
                      <th
                        scope="col"
                        className="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        Apply
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {courses.length === 0
                      ? "No courses available"
                      : courses.map((course, index) => {
                          return (
                            <tr key={index}>
                              <td className="px-4 py-4 text-sm font-medium whitespace-nowrap">
                                <div className="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800">
                                  {course.courseCode}
                                </div>
                              </td>
                              <td className="px-12 py-4 text-sm font-medium whitespace-nowrap">
                                <h2 className="font-medium text-gray-800 dark:text-white ">
                                  {course.courseTitle}
                                </h2>
                              </td>
                              <td className="px-4 py-4 text-sm whitespace-nowrap">
                                <button
                                  className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
                                  onClick={() => {
                                    addToCart({ courseId: course._id });
                                  }}
                                >
                                  Apply
                                </button>
                              </td>
                            </tr>
                          );
                        })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Apply;
