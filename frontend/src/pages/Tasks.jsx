import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../components/ui/Loader";
import Title from "../components/ui/Title";
import Button from "../components/ui/Button";
import { IoMdAdd } from "react-icons/io";
import Board from "../components/ui/Board";
import AddTask from "../components/tasks/AddTask";
import { useTaskContext } from "../store/TaskContext";

const Tasks = () => {
  const params = useParams();
  const [selected, setSelected] = useState(0);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const { tasks } = useTaskContext();
  const status = params?.status || "";

  useEffect(() => {
    setLoading(tasks.length === 0);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [tasks]);

  return loading ? (
    <div className="py-10">
      <Loader />
    </div>
  ) : (
    <div className="w-full">
      {tasks.length === 0 && <h4 className="text-white">No tasks...</h4>}
      <div className="flex items-center justify-between mb-4">
        <Title
          className={"text-white"}
          title={status ? `${status} Tasks` : "Tasks"}
        />

        {!status && (
          <Button
            onClick={() => setOpen(true)}
            label="Create Task"
            icon={<IoMdAdd className="text-lg" />}
            className="flex flex-row-reverse gap-1 items-center bg-blue-600 text-white rounded-md py-2 2xl:py-2.5"
          />
        )}
      </div>

      <Board tasks={tasks} />
      <AddTask open={open} setOpen={setOpen} resetTask={{}} />
    </div>
  );
};

export default Tasks;
