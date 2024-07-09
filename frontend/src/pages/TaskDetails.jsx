import clsx from "clsx";
import moment from "moment";
import React, { useState, useEffect } from "react";
import { FaBug, FaTasks, FaThumbsUp, FaUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdTaskAlt,
} from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";
import { useParams } from "react-router-dom";
import { toast } from "sonner";
import { tasks } from "../assets/data";
import Tabs from "../components/ui/Tabs";
import { PRIOTITYSTYELS, TASK_TYPE } from "../utils/stylers";
import { getInitials } from "../utils/getInitials";
import Loading from "../components/ui/Loader.jsx";
import Button from "../components/ui/Button";

import io from "socket.io-client";
import { useAuth } from "@clerk/clerk-react";

const ICONS = {
  HIGH: <MdKeyboardDoubleArrowUp />,
  MEDIUM: <MdKeyboardArrowUp />,
  NORMAL: <MdKeyboardArrowDown />,
};

const bgColor = {
  HIGH: "bg-red-200",
  MEDIUM: "bg-yellow-200",
  NORMAL: "bg-blue-200",
};

const TABS = [
  { title: "Task Detail", icon: <FaTasks /> },
  { title: "Activities/Timeline", icon: <RxActivityLog /> },
];

const TASKTYPEICON = {
  commented: (
    <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white">
      <MdOutlineMessage />,
    </div>
  ),
  started: (
    <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white">
      <FaThumbsUp size={20} />
    </div>
  ),
  assigned: (
    <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-500 text-white">
      <FaUser size={14} />
    </div>
  ),
  bug: (
    <div className="text-red-600">
      <FaBug size={24} />
    </div>
  ),
  completed: (
    <div className="w-10 h-10 rounded-full bg-green-600 flex items-center justify-center text-white">
      <MdOutlineDoneAll size={24} />
    </div>
  ),
  "in progress": (
    <div className="w-8 h-8 flex items-center justify-center rounded-full bg-violet-600 text-white">
      <GrInProgress size={16} />
    </div>
  ),
};

const act_types = [
  "Started",
  "Completed",
  "In Progress",
  "Commented",
  "Bug",
  "Assigned",
];

const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;
const TaskDetails = () => {
  const { id } = useParams();
  console.log(id);
  const { sessionId, userId } = useAuth();
  const [selected, setSelected] = useState(0);
  const [task, setTask] = useState([]);

  useEffect(() => {
    if (sessionId) {
      const socket = io(BACKEND_URI, {
        auth: {
          sessionId,
          userId,
        },
      });
      socket.on("connect", () => {
        console.log("Socket connected successfully!", socket);
      });

      socket.emit("task:gettaskbyid", id);
      socket.on("getTaskById", (data) => {
        console.log("data", data);
        const newData = {
          ...data,
          team: [...data.collaborators, ...data.creators, ...data.viewers],
        };
        console.log("newData", newData);
        setTask(newData);
      });
    }
  }, [sessionId]);

  return (
    <div className="w-full flex flex-col gap-3 mb-4 overflow-y-hidden">
      <h1 className="text-2xl text-gray-600 font-bold">{task?.name}</h1>

      <Tabs tabs={TABS} setSelected={setSelected}>
        {selected === 0 ? (
          <>
            <div className="w-full flex flex-col md:flex-row gap-5 2xl:gap-8 bg-white shadow-md p-8 overflow-y-auto">
              {/* LEFT */}
              <div className="w-full md:w-1/2 space-y-8">
                <div className="flex items-center gap-5">
                  <div
                    className={clsx(
                      "flex gap-1 items-center text-base font-semibold px-3 py-1 rounded-full",
                      PRIOTITYSTYELS[task?.priority],
                      bgColor[task?.priority],
                    )}
                  >
                    <span className="text-lg">{ICONS[task?.priority]}</span>
                    <span className="uppercase">{task?.priority} Priority</span>
                  </div>

                  <div className={clsx("flex items-center gap-2")}>
                    <div
                      className={clsx(
                        "w-4 h-4 rounded-full",
                        TASK_TYPE[task.status],
                      )}
                    />
                    <span className="text-black uppercase">{task?.status}</span>
                  </div>
                </div>

                <p className="text-gray-500">
                  Created At: {new Date(task?.createdAt).toDateString()}
                </p>

                <p className="text-gray-500">{task?.description}</p>
                <div className="space-y-4 py-6">
                  <p className="text-gray-600 font-semibold test-sm">
                    TASK TEAM
                  </p>
                  <div className="space-y-3">
                    {task?.team?.map((m, index) => (
                      <div
                        key={index}
                        className="flex gap-4 py-2 items-center border-t border-gray-200"
                      >
                        <div
                          className={
                            "w-10 h-10 rounded-full text-white flex items-center justify-center text-sm -mr-1 bg-blue-600"
                          }
                        >
                          <span className="text-center">
                            {getInitials(m?.name)}
                          </span>
                        </div>

                        <div>
                          <p className="text-lg font-semibold">{m?.name}</p>
                          <span className="text-gray-500">{m?.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              {/* RIGHT */}
            </div>
          </>
        ) : (
          <>
            <Activities task={task} activity={task?.activities} id={id} />
          </>
        )}
      </Tabs>
    </div>
  );
};

const Activities = ({ activity, id, task }) => {
  const [selected, setSelected] = useState(act_types[0]);
  const [text, setText] = useState("");
  const [comments, setComments] = useState();
  const isLoading = false;
  console.log("taskkkkkkkkkk", task);
  const { sessionId, userId } = useAuth();

  function findUser(array, id) {
    return array.some((user) => user.id === id);
  }

  useEffect(() => {
    if (sessionId) {
      const socket = io(BACKEND_URI, {
        auth: {
          sessionId,
          userId,
        },
      });
      socket.on("connect", () => {
        console.log("Socket connected successfully!", socket);
      });

      console.log("Task from useeffect", task);
      socket.emit("comment:getallcomments", task._id);
      socket.on("getComments", (data) => {
        setComments(data);
      });
    }
  }, [task]);

  const handleSubmit = async () => {
    const userIdToSearch = userId;

    const foundInCreators = findUser(task.creators, userIdToSearch);
    const foundInCollaborators =
      task.creatorId !== userId && findUser(task.collaborators, userIdToSearch);
    const isCreator = task.creatorId === userId;

    if (foundInCreators || isCreator) {
      const newComment = {
        taskId: task._id,
        taskCreatorId: task.creatorId,
        creators: [{ creatorId: userId, text: text, tags: selected }],
      };

      if (sessionId) {
        const socket = io(BACKEND_URI, {
          auth: {
            sessionId,
            userId,
          },
        });
        socket.on("connect", () => {
          console.log("Socket connected successfully!", socket);
        });

        socket.emit("comment:createcomment", newComment);
        socket.on("getComments", (data) => {
          setComments(data);
        });
      }
    } else if (foundInCollaborators) {
      const newComment = {
        taskId: task._id,
        taskCreatorId: task.creatorId,
        collaborators: [{ collaboratorId: userId, text: text, tags: selected }],
      };

      if (sessionId) {
        const socket = io(BACKEND_URI, {
          auth: {
            sessionId,
            userId,
          },
        });
        socket.on("connect", () => {
          console.log("Socket connected successfully!", socket);
        });

        socket.emit("comment:createcomment", newComment);
        socket.on("getComments", (data) => {
          setComments(data);
        });
      }
    } else {
      console.log(`User ${userIdToSearch} not found in either array.`);
    }
  };

  const Card = ({ item, comment, creators, collaborators, viewers }) => {
    return (
      <div className="flex space-x-4">
        <div className="flex flex-col items-center flex-shrink-0">
          <div className="w-10 h-10 flex items-center justify-center">
            {TASKTYPEICON[comment?.tags.toLowerCase()]}
          </div>
          <div className="w-full flex items-center">
            <div className="w-0.5 bg-gray-300 h-full"></div>
          </div>
        </div>

        <div className="flex flex-col gap-y-1 mb-8">
          <p className="font-semibold">{comment?.text}</p>
          <div className="text-gray-500 space-y-2">
            <span className="capitalize">
              By {creators ? "Creator" : "Collaborater"} {comment?.name}
            </span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full flex gap-10 2xl:gap-20 min-h-screen px-10 py-8 bg-white shadow rounded-md justify-between overflow-y-auto">
      <div className="w-full md:w-1/2">
        <h4 className="text-gray-600 font-semibold text-lg mb-5">Activities</h4>

        {comments && (
          <div className="w-full">
            {comments.creators[0] !== null &&
              comments.creators.map((comment, index) => (
                <Card key={index} comment={comment} creators={true} />
              ))}
          </div>
        )}
        {comments && (
          <div className="w-full">
            {comments.collaborators[0] !== null &&
              comments.collaborators.map((comment, index) => (
                <Card key={index} comment={comment} collaborators={true} />
              ))}
          </div>
        )}
      </div>

      <div className="w-full md:w-1/3">
        {!task.viewers.some((viewer) => viewer.viewerId === userId) && (
          <>
            <h4 className="text-gray-600 font-semibold text-lg mb-5">
              Add Activity
            </h4>
            <div className="w-full flex flex-wrap gap-5">
              {act_types.map((item, index) => (
                <div key={item} className="flex gap-2 items-center">
                  <input
                    type="checkbox"
                    className="w-4 h-4"
                    checked={selected === item ? true : false}
                    onChange={(e) => setSelected(item)}
                  />
                  <p>{item}</p>
                </div>
              ))}
              <textarea
                rows={10}
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type ......"
                className="bg-white w-full mt-10 border border-gray-300 outline-none p-4 rounded-md focus:ring-2 ring-blue-500"
              ></textarea>
              {isLoading ? (
                <Loading />
              ) : (
                <Button
                  type="button"
                  label="Submit"
                  onClick={handleSubmit}
                  className="bg-blue-600 text-white rounded"
                />
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
export default TaskDetails;
