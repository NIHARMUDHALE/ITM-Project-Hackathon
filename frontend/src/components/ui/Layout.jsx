import Sidebar from "./Sidebar";
import { useRef } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { Fragment } from "react";
import { Transition } from "@headlessui/react";
import clsx from "clsx";
import { IoClose } from "react-icons/io5";
import { useTaskContext } from "../../store/TaskContext";

const MobileSidebar = () => {
  const { openSideBar, closeSidebar } = useTaskContext();
  const mobileMenuRef = useRef(null);
  return (
    <>
      <Transition
        show={openSideBar}
        as={Fragment}
        enter="transition-opacity duration-700"
        enterFrom="opacity-x-10"
        enterTo="opacity-x-100"
        leave="transition-opacity duration-700"
        leaveFrom="opacity-x-100"
        leaveTo="opacity-x-0"
      >
        {(ref) => (
          <div
            ref={(node) => (mobileMenuRef.current = node)}
            className={clsx(
              "md:hidden w-full h-full bg-black/40 transition-all duration-700 transform ",
              openSideBar ? "translate-x-0" : "translate-x-full",
            )}
            onClick={() => closeSidebar()}
          >
            <div className="bg-white w-3/4 h-full">
              <div className="w-full flex justify-end px-5 mt-5">
                <button
                  onClick={() => closeSidebar()}
                  className="flex justify-end items-end"
                >
                  <IoClose size={25} />
                </button>
              </div>

              <div className="-mt-10">
                <Sidebar />
              </div>
            </div>
          </div>
        )}
      </Transition>
    </>
  );
};

const Layout = () => {
  return (
    <div className="w-full h-screen flex flex-col md:flex-row">
      <div className="w-full h-screen flex flex-col md:flex-row">
        <div className="w-1/5 h-screen bg-white sticky top-0 hidden md:block">
          <Sidebar />
        </div>
        <MobileSidebar />
        <div className="flex-1 overflow-y-auto">
          <Navbar />
          <div className="p-4 2xl:px-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Layout;
