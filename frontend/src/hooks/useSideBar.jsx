import { useState } from "react";

const useSideBar = () => {
  const [openSideBar, setOpenSidebar] = useState(false);

  const closeSidebar = () => {
    console.log("clicked", openSideBar);
    setOpenSidebar(!openSideBar);
  };

  return { openSideBar, closeSidebar };
};

export default useSideBar;
