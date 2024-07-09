import React from "react";
import { UserButton } from "@clerk/clerk-react";
import { useTaskContext } from "../../store/TaskContext";

const Navbar = () => {
  const { closeSidebar } = useTaskContext();

  return (
    <div className="flex justify-between items-center bg-white px-4 py-3 2xl:py-4 sticky z-10 top-0">
      <div className="flex gap-4">
        <button
          onClick={() => closeSidebar()}
          className="text-2xl text-gray-500 block md:hidden"
        >
          ☰
        </button>
      </div>

      <div className="flex gap-2 items-center">
        <UserButton />
      </div>
    </div>
  );
};

export default Navbar;
