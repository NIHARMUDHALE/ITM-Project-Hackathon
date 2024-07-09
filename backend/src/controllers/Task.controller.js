import mongoose from "mongoose";
import Task from "../models/Task.model.js";
import Comment from "../models/Comments.model.js";
export const createTask = async (io, task) => {
  try {
    if (
      task.name === "" ||
      task.description === "" ||
      task.due_date === "" ||
      task.priority === "" ||
      task.status === ""
    ) {
      console.log("somehting went wrong here");
      return io.emit({ success: false, message: "All fields are required!" });
    }

    const newTask = {
      creatorId: task.userId,
      name: task.name,
      description: task.description,
      status: task.status,
      priority: task.priority,
      due_date: task.date,
      createdAt: Date.now(),
      creators: task.selectedWorkers.CREATORS,
      collaborators: task.selectedWorkers.COLLABORATORS,
      viewers: task.selectedWorkers.VIEWERS,
      workers: [{}],
    };

    const dbTask = new Task(newTask);
    console.log("Task created");
    await dbTask.save();
    return io.emit("getTask", dbTask);
  } catch (error) {
    console.log(error);
    return io.emit({ success: false, error: error });
  }
};

export const getAllTasks = async (io) => {
  try {
    const tasks = await Task.find();
    return io.emit("getAllTasks", tasks);
  } catch (e) {
    io.emit({ success: false, message: e });
    return;
  }
};

export const getTaskById = async (io, id) => {
  try {
    const task = await Task.findById(id);
    if (!task) {
      io.emit({ success: false, message: "Task doesnt exist!" });
      return;
    }
    console.log("Fetched task");
    io.emit("getTaskById", task);
    return;
  } catch (error) {
    io.emit({ success: false, message: error });
  }
};

export const updateTask = async (io, task) => {
  try {
    if (
      task.name === "" ||
      task.description === "" ||
      task.due_date === "" ||
      task.priority === "" ||
      task.status === ""
    ) {
      console.log("somehting went wrong here");
      return io.emit({ success: false, message: "All fields are required!" });
    }

    const taskDb = await Task.findById(task.id);

    const updatedTask = {
      creatorId: task.userId,
      name: task.name,
      description: task.description,
      status: task.status,
      priority: task.priority,
      due_date: task.date,
      createdAt: taskDb.createdAt,
      creators: task.selectedWorkers.CREATORS,
      collaborators: task.selectedWorkers.COLLABORATORS,
      viewers: task.selectedWorkers.VIEWERS,
      workers: task.workers,
    };

    const dbTask = await Task.findByIdAndUpdate(task.id, updatedTask);
    console.log("Task updated");
    return io.emit("getTask", dbTask);
  } catch (error) {
    console.log(error);
    return io.emit({ success: false, error: error });
    za;
  }
};

export const deleteTask = async (io, id) => {
  try {
    const taskDb = await Task.findById(id);

    if (!taskDb) {
      return io.emit({ success: false, message: "All fields are required!" });
    }

    await Task.deleteOne({ _id: id });
    const comment = await Comment.findOne({ taskId: id });

    if (comment) {
      await Comment.deleteOne({ taskId: id });
    }

    const allTasks = await Task.find();

    return io.emit("getAllTasks", allTasks);
  } catch (e) {
    io.emit({ success: false, message: e });
    return;
  }
};
