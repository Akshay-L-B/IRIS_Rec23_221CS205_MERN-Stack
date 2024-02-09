import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";
import UserContext from "../contexts/UserContext";

const Cart = () => {
  const host = "http://localhost:5000";
  const [cart, setCart] = useState([]);
  const context = useContext(UserContext);
  const { removeFromCart, enrollInCourses } = context;
  let navigate = useNavigate();

  const fetchCourses = async () => {
    try {
      if (localStorage.getItem("token")) {
        const response = await fetch(`${host}/cart/showCart`, {
          method: "GET",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token"),
          },
        }); // Replace with your actual API endpoint
        const data = await response.json();
        if (data.message !== "Cart not found for the student") setCart(data);
        console.log(data);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  useEffect(() => {
    // Fetch available courses from your backend API
    fetchCourses(); //eslint-disable-next-line
  }, []);
  return (
    <div>
      <Navbar />
      <section className="container px-4 mx-auto my-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Your Cart
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
                        Remove
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                    {!cart || cart.length === 0
                      ? "Cart is empty"
                      : cart.map((course, index) => {
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
                                  onClick={async () => {
                                    const removeId = course._id;
                                    removeFromCart({
                                      courseId: removeId,
                                    });
                                    setCart((prevCart) =>
                                      prevCart.filter(
                                        (course) => course._id !== removeId
                                      )
                                    );
                                  }}
                                >
                                  Remove
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
      <button
        class="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80 mx-20 my-3"
        onClick={() => enrollInCourses()}
      >
        Add these courses
      </button>
    </div>
  );
};

export default Cart;
