import React from "react";
import { Link } from "react-router-dom";

const SelectRole = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-3xl mb-6 font-bold">Select Your Role</h2>
      <div className="flex gap-4">
        <Link to="/student/login">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Student
          </button>
        </Link>
        <Link to="/faculty/login">
          <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Faculty
          </button>
        </Link>
        <Link to="/admin/login">
          <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Admin
          </button>
        </Link>
      </div>
    </div>
  );
};

export default SelectRole;
