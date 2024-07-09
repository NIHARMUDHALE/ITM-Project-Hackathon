// TaskContext.js
import React, { createContext, useContext, useState, useEffect } from "react";

import { useAuth } from "@clerk/clerk-react";
import io from "socket.io-client";
const TaskContext = createContext();

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;
export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const { sessionId, userId } = useAuth();

  const [openSideBar, setOpenSidebar] = useState(false);

  const closeSidebar = () => {
    console.log("clicked", openSideBar);
    setOpenSidebar(!openSideBar);
  };
  let socket = null;

  useEffect(() => {
    if (sessionId) {
      socket = io(BACKEND_URI, {
        auth: {
          sessionId,
          userId,
        },
      });
      socket.on("connect", () => {
        console.log("Socket connected successfully!", socket);
      });

      socket.emit("task:getall");
      socket.on("getAllTasks", (data) => {
        const newData = data.map((item) => ({
          ...item,
          team: [...item.collaborators, ...item.creators, ...item.viewers],
        }));
        setTasks(newData);
      });
    }
  }, [sessionId, socket]);

  const addTasks = (tasks) => {
    setTasks(tasks);
  };
  const addUsers = (users) => {
    setTasks(users);
  };

  const deleteTaskById = (id) => {
    setTasks((prev) => {
      const newData = prev.filter((item) => item._id !== id);
      return newData;
    });
  };

  const fetchTasks = () => {
    socket.connect();
    socket.emit("task:getall");
    socket.on("getAllTasks", (data) => {
      const newData = data.map((item) => ({
        ...item,
        team: [...item.collaborators, ...item.creators, ...item.viewers],
      }));
      setTasks(newData);
    });
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        addTasks,
        users,
        addUsers,
        deleteTaskById,
        closeSidebar,
        openSideBar,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

// Custom hook to access the context
export function useTaskContext() {
  return useContext(TaskContext);
}
