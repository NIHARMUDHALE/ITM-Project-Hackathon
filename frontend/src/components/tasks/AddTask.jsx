import React, { useState, useEffect } from "react";
import ModalWrapper from "../WrapperModal";
import { DialogTitle } from "@headlessui/react";
import Textbox from "../ui/Textbox";
import UserList from "../users/UserList";
import SelectList from "../ui/SelectList";
import Button from "../ui/Button";
import { useAuth } from "@clerk/clerk-react";

import io from "socket.io-client";
import { useTaskContext } from "../../store/TaskContext";
const LISTS = ["OPEN", "IN PROGRESS", "COMPLETED"];
const PRIORIRY = ["HIGH", "MEDIUM", "NORMAL", "LOW"];
const ROLES = ["CREATOR", "COLLABORATOR", "VIEWER"];

const AddTask = ({ open, setOpen, resetTask }) => {
  let task = "";
  const [name, setName] = useState(resetTask.name ? resetTask.name : "");
  const [description, setDescription] = useState(
    resetTask.description ? resetTask.description : "",
  );
  const [date, setDate] = useState(
    resetTask.due_date ? resetTask.due_date : new Date(),
  );
  const [team, setTeam] = useState(resetTask.team ? resetTask.team : []);
  const [status, setStatus] = useState(
    resetTask.status ? resetTask.status : LISTS[0],
  );
  const [priority, setPriority] = useState(
    resetTask.priority ? resetTask.priority : PRIORIRY[2],
  );
  const [selectedWorkers, setSelectedWorkers] = useState({
    CREATORS: resetTask.creators ? resetTask.creators : [],
    COLLABORATORS: resetTask.collaborators ? resetTask.collaborators : [],
    VIEWERS: resetTask.viewers ? resetTask.viewers : [],
  });

  const handleWorkersList = (workerType, e) => {
    if (workerType === "CREATOR") {
      setSelectedWorkers((prev) => {
        const newCollabs = prev.COLLABORATORS.filter(
          (user) => !e.includes(user),
        );
        const newViewers = prev.VIEWERS.filter((user) => !e.includes(user));
        const newCreators = prev.CREATORS.filter((user) => !e.includes(user));

        return {
          CREATORS: [...e],
          COLLABORATORS: [...newCollabs],
          VIEWERS: [...newViewers],
        };
      });
    }
    if (workerType === "COLLABORATOR") {
      setSelectedWorkers((prev) => {
        const newCollabs = prev.COLLABORATORS.filter(
          (user) => !e.includes(user),
        );
        const newViewers = prev.VIEWERS.filter((user) => !e.includes(user));
        const newCreators = prev.CREATORS.filter((user) => !e.includes(user));

        return {
          CREATORS: [...newCreators],
          COLLABORATORS: [...e],
          VIEWERS: [...newViewers],
        };
      });
    }
    if (workerType === "VIEWER") {
      setSelectedWorkers((prev) => {
        const newCollabs = prev.COLLABORATORS.filter(
          (user) => !e.includes(user),
        );
        const newViewers = prev.VIEWERS.filter((user) => !e.includes(user));
        const newCreators = prev.CREATORS.filter((user) => !e.includes(user));

        return {
          CREATORS: [...newCreators],
          COLLABORATORS: [...newCollabs],
          VIEWERS: [...e],
        };
      });
    }
  };
  const { addTasks, tasks } = useTaskContext();
  const { sessionId, userId } = useAuth();

  const BACKEND_URI = import.meta.env.VITE_BACKEND_URI;

  const createMyNewTaskSubmitHandler = () => {
    const newTask = {
      userId,
      name,
      description,
      status,
      priority,
      date,
      selectedWorkers,
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

      socket.emit("task:create", newTask);
      socket.emit("task:getall");
      socket.on("getAllTasks", (data) => {
        const newData = data.map((item) => ({
          ...item,
          team: [...item.collaborators, ...item.creators, ...item.viewers],
        }));
        addTasks(newData);
      });
    }

    setName("");
    setDescription("");
    setSelectedWorkers({
      CREATORS: [],
      COLLABORATORS: [],
      VIEWERS: [],
    });
    setPriority(task?.priority?.toUpperCase() || PRIORIRY[2]);
    setDate(new Date());
    setStatus(task?.stage?.toUpperCase() || LISTS[0]);
    setOpen(!open);
  };

  const updateMyNewTaskSubmitHandler = () => {
    const updatedTask = {
      id: resetTask._id,
      userId,
      name,
      description,
      status,
      priority,
      date,
      selectedWorkers,
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

      socket.emit("task:updatetask", updatedTask);
      socket.emit("task:getall");
      socket.on("getAllTasks", (data) => {
        const newData = data.map((item) => ({
          ...item,
          team: [...item.collaborators, ...item.creators, ...item.viewers],
        }));
        addTasks(newData);
      });
    }

    setName("");
    setDescription("");
    setSelectedWorkers({
      CREATORS: [],
      COLLABORATORS: [],
      VIEWERS: [],
    });
    setPriority(task?.priority?.toUpperCase() || PRIORIRY[2]);
    setDate(new Date());
    setStatus(task?.stage?.toUpperCase() || LISTS[0]);
    setOpen(!open);
  };

  return (
    <>
      <ModalWrapper open={open} setOpen={setOpen}>
        <form>
          <DialogTitle
            as="h2"
            className="text-base font-bold leading-6 text-gray-900 mb-4"
          >
            {task ? "UPDATE TASK" : "ADD TASK"}
          </DialogTitle>

          <div className="mt-2 flex flex-col gap-6">
            <div className="w-full flex flex-col gap-1">
              <label htmlFor="name" className="text-slate-800">
                Task Name
              </label>
              <div>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  name="name"
                  placeholder="Task Name"
                  className="bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300 w-full rounded"
                />
              </div>
            </div>

            <div className="w-full flex flex-col gap-1">
              <label htmlFor="description" className="text-slate-800">
                Task Description
              </label>
              <div>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  name="description"
                  placeholder="Task Description"
                  className="bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300 w-full rounded"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-1">
              <UserList
                handleWorkersList={handleWorkersList}
                userListTitle="Creators"
                workerType="CREATOR"
                setTeam={setTeam}
                team={team}
                roleSelectList={ROLES}
                selectedWorkers={selectedWorkers.CREATORS}
              />
              <UserList
                handleWorkersList={handleWorkersList}
                userListTitle="Collaborators"
                setTeam={setTeam}
                workerType="COLLABORATOR"
                team={team}
                roleSelectList={ROLES}
                selectedWorkers={selectedWorkers.COLLABORATORS}
              />
              <UserList
                handleWorkersList={handleWorkersList}
                userListTitle="Viewers"
                workerType="VIEWER"
                setTeam={setTeam}
                team={team}
                roleSelectList={ROLES}
                selectedWorkers={selectedWorkers.VIEWERS}
              />
            </div>
            <div className="flex gap-4 items-center">
              <SelectList
                label="Task Status"
                lists={LISTS}
                selected={status}
                setSelected={setStatus}
                className="w-full rounded"
              />

              <div className="w-full flex flex-col gap-1">
                <label htmlFor="due_date" className="text-slate-800">
                  Due Date
                </label>
                <div>
                  <Textbox
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    rows={3}
                    name="due_date"
                    type="date"
                    placeholder="Task Due Date"
                    className="cursor pointer bg-transparent px-3 py-2.5 2xl:py-3 border border-gray-300 placeholder-gray-400 text-gray-900 outline-none text-base focus:ring-2 ring-blue-300 w-full rounded"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <SelectList
                label="Priority Level"
                lists={PRIORIRY}
                selected={priority}
                setSelected={setPriority}
              />
            </div>

            <div className="bg-gray-50 py-6 sm:flex sm:flex-row-reverse gap-4">
              <Button
                onClick={
                  resetTask._id
                    ? updateMyNewTaskSubmitHandler
                    : createMyNewTaskSubmitHandler
                }
                label={resetTask._id ? "Update" : "Submit"}
                className="bg-blue-600 px-8 text-sm font-semibold text-white hover:bg-blue-700  sm:w-auto"
              />

              <Button
                type="button"
                className="bg-white px-5 text-sm font-semibold text-gray-900 sm:w-auto"
                onClick={() => setOpen(false)}
                label="Cancel"
              />
            </div>
          </div>
        </form>
      </ModalWrapper>
    </>
  );
};

export default AddTask;
