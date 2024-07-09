import React from "react";
import TaskCard from "./TaskCard";

import Table from "./Table";
import TaskTitle from "./TaskTitle";
import Tabs from "./Tabs";
import { FaList } from "react-icons/fa";
import { MdGridView } from "react-icons/md";
const TABS = [
  { title: "Board View", icon: <MdGridView /> },
  { title: "List View", icon: <FaList /> },
];

const TASK_TYPE = {
  OPEN: "bg-blue-600",
  "IN PROGRESS": "bg-yellow-600",
  COMPLETED: "bg-green-600",
};
const Board = ({ tasks }) => {
  return (
    <div className="w-full flex justify-between gap-4 md:gap-x-12 py-4">
      <div className="w-full">
        <TaskTitle label="OPEN" className={TASK_TYPE.OPEN} />
        {tasks
          .filter((task) => task.status === "OPEN")
          .map((task, index) => (
            <div className="my-3" key={task._id}>
              <TaskCard task={task.status === "OPEN" && task} key={index} />
            </div>
          ))}
      </div>
      <div className="w-full">
        <TaskTitle label="IN PROGRESS" className={TASK_TYPE["IN PROGRESS"]} />
        {tasks.find((task) => task.status === "IN PROGRESS") && (
          <>
            {tasks
              .filter((task) => task.status === "IN PROGRESS")
              .map((task, index) => (
                <div className="my-3" key={task._id}>
                  <TaskCard
                    task={task.status === "IN PROGRESS" && task}
                    key={index}
                  />
                </div>
              ))}
          </>
        )}
      </div>
      <div className="w-full">
        <TaskTitle label="COMPLETED" className={TASK_TYPE.COMPLETED} />
        {tasks.find((task) => task.status === "COMPLETED") && (
          <>
            {tasks
              .filter((task) => task.status === "COMPLETED")
              .map((task, index) => (
                <div className="my-3" key={task._id}>
                  <TaskCard
                    task={task.status === "COMPLETED" && task}
                    key={index}
                  />
                </div>
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Board;
