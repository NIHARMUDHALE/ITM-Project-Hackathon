import React, { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import SignUp from "./SignUp";

const SignIn = () => {
  const [isSignUp, setIsSignUp] = useState(false);

  const formToggleHandler = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <form action="">
      <div className="mb-6">
        <SignUp />
        <label
          className="block mb-1.5 text-sm text-gray-200 font-semibold"
          for=""
        >
          Email
        </label>
        <input
          className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
          type="email"
          placeholder="jhon@doe.com"
        />
      </div>
      <div className="mb-7">
        <div className="flex mb-1.5 items-center justify-between">
          <label className="block text-sm text-gray-200 font-semibold" for="">
            Password
          </label>
          <a
            className="inline-block text-xs font-semibold text-orange-700 hover:text-gray-900"
            href="#"
          >
            Forget password?
          </a>
        </div>
        <div className="relative">
          <input
            className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
            type="password"
            placeholder="Enter your password"
          />
          <button className="absolute top-1/2 right-0 mr-3 transform -translate-y-1/2 inline-block hover:scale-110 transition duration-100">
            <FaEyeSlash />
          </button>
        </div>
      </div>
      <button
        className="relative group block w-full mb-32 py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-orange-700 rounded-full overflow-hidden"
        type="submit"
      >
        <div className="absolute top-0 right-full w-full h-full bg-gray-800 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
        <span className="relative">Login</span>
      </button>
    </form>
  );
};

export default SignIn;
