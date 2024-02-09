import React from "react";
import UserContext from "./UserContext";
import { useNavigate } from "react-router-dom";

const UserState = (props) => {
  const host = "http://localhost:5000";
  let navigate = useNavigate(); // for redirecting page purposes

  const loginUser = async (details) => {
    try {
      console.log(details);
      const response = await fetch(`${host}/${details.role}/login`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });
      const jsonType = await response.json();
      console.log(jsonType);
      localStorage.setItem("token", jsonType.token);
      navigate(`/${details.role}/dashboard`);
    } catch (error) {
      console.error("Error Logging in", error.message);
    }
  };

  const registerUser = async (details) => {
    try {
      const response = await fetch(`${host}/${details.role}/signup`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(details),
      });
      const jsonType = await response.json();
      console.log(jsonType);
      localStorage.setItem("token", jsonType.token);
      navigate(`/${details.role}/dashboard`);
    } catch (error) {
      console.error("Error Signing up", error.message);
    }
  };

  const addToCart = async (courseId) => {
    try {
      const response = await fetch(`${host}/cart/add-to-cart`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(courseId),
      });
      const jsonType = await response.json();
      console.log(jsonType);
      alert(jsonType.message);
    } catch (error) {
      console.error("Error adding to cart: ", error.message);
    }
  };

  const removeFromCart = async (courseId) => {
    try {
      const response = await fetch(`${host}/cart/remove-from-cart`, {
        method: "DELETE",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify(courseId),
      });
      const jsonType = await response.json();
      alert(jsonType.message);
      return jsonType;
    } catch (error) {
      console.error("Error removing from cart: ", error.message);
    }
  };

  const enrollInCourses = async () => {
    try {
      const response = await fetch(`${host}/cart//finalize-enrollment`, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const jsonType = await response.json();
      alert(jsonType.message);
      navigate("/student/dashboard");
    } catch (error) {
      console.error("Error removing from cart: ", error.message);
    }
  };

  return (
    <UserContext.Provider
      value={{
        loginUser,
        registerUser,
        addToCart,
        removeFromCart,
        enrollInCourses,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserState;
