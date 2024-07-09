import clsx from "clsx";
import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { BGS, PRIOTITYSTYELS, TASK_TYPE } from "../../utils/stylers";
import { formatDate } from "../../utils/dateFormatters";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import UserInfo from "../ui/UserInfo.jsx";
import { IoMdAdd } from "react-icons/io";
import TaskDialog from "../tasks/DialogTask.jsx";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="w-full h-fit bg-white shadow-md p-4 rounded">
        <div className="w-full flex justify-between">
          <div
            className={clsx(
              "flex flex-1 gap-1 items-center text-sm font-medium",
              PRIOTITYSTYELS[task?.priority],
            )}
          >
            <span className="text-lg">{ICONS[task?.priority]}</span>
            <span className="uppercase">{task?.priority} Priority</span>
          </div>
          {<TaskDialog task={task} />}
        </div>

        <>
          <div className="flex items-center gap-2">
            <div
              className={clsx("w-4 h-4 rounded-full", TASK_TYPE[task.status])}
            />
            <h4 className="line-clamp-1 text-black">{task?.name}</h4>
          </div>
          <span className="text-sm text-gray-600">
            {formatDate(new Date(task?.createdAt))}
          </span>
        </>

        <div className="w-full border-t border-gray-200 my-2" />
        <div className="flex items-center justify-between mb-2">
          <div className="flex flex-row-reverse">
            {task?.team?.map((m, index) => (
              <div
                key={index}
                className={clsx(
                  "w-7 h-7 rounded-full text-white flex items-center justify-center text-sm -mr-1",
                  BGS[index % BGS?.length],
                )}
              >
                <UserInfo user={m} />
              </div>
            ))}
          </div>
        </div>
        <h5 className="text-base line-clamp-1 text-black">
          {task?.description}
        </h5>
      </div>
    </>
  );
};

export default TaskCard;
