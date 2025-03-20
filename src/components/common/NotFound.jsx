import React from "react";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { BiError } from "react-icons/bi";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-6 text-center">
      <BiError className="text-red-500 text-6xl mb-4" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-6">
        Oops! The page you're looking for doesn't exist.
      </p>
      <Link to="/">
        <Button gradientDuoTone="pinkToOrange">Go Back Home</Button>
      </Link>
    </div>
  );
};

export default NotFound;
