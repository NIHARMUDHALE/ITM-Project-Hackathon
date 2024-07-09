import React from "react";

const SignUp = () => {
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <label
          className="block mb-1.5 text-sm text-gray-200 font-semibold mr-1"
          htmlFor=""
        >
          Firstname
          <input
            className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
            type="text"
            placeholder="Jhon"
          />
        </label>
        <label
          className="block mb-1.5 text-sm text-gray-200 font-semibold"
          htmlFor=""
        >
          Lastname
          <input
            className="w-full py-3 px-4 text-sm text-gray-900 placeholder-gray-400 border border-gray-200 focus:border-purple-500 focus:outline-purple rounded-lg"
            type="text"
            placeholder="Doe"
          />
        </label>
      </div>
    </>
  );
};

export default SignUp;
