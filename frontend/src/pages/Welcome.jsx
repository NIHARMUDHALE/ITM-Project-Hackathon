import React from "react";
import { useClerk, UserButton, useSession } from "@clerk/clerk-react";
import welcomebg from "../assets/welcomebg.jpg";

const Welcome = () => {
  const clerk = useClerk();

  const myDate = new Date();
  const hours = myDate.getHours();
  let greet;

  if (hours < 12) {
    greet = "morning";
  } else if (hours >= 12 && hours < 18) {
    greet = "afternoon";
  } else {
    greet = "evening";
  }

  return (
    <div className="relative flex flex-col justify-center items-center h-screen">
      <img
        src={welcomebg}
        className="absolute w-full h-full rounded-3xl top-0 left-0 opacity-10"
      />
      <div className="z-10 flex flex-col justify-center items-center">
        <h4 className="font-heading text-2xl md:text-5xl lg:text-6xl text-white font-bold mb-8">
          Good {greet}!
        </h4>

        <p className="text-lg font-semibold text-gray-200">
          Please login to proceed.
        </p>
        <button
          onClick={() => clerk.openSignIn({})}
          className="relative group block w-full mt-12 py-3 px-5 text-center text-sm font-semibold text-orange-50 bg-orange-700 rounded-full overflow-hidden"
          type="submit"
        >
          <div className="absolute top-0 right-full w-full h-full bg-gray-800 transform group-hover:translate-x-full group-hover:scale-102 transition duration-500"></div>
          <span className="relative">Login</span>
        </button>
      </div>
    </div>
  );
};

export default Welcome;
