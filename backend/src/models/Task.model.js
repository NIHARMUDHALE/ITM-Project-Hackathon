import mongoose from "mongoose";

const workersSchema = new mongoose.Schema(
  {
    user: { type: String },
    started_at: { type: Date },
    completed_at: { type: Date },
  },
  {
    default: {
      user: "",
      started_at: null,
      completed_at: null,
    },
  },
);

const RoleSchema = new mongoose.Schema({
  id: {
    type: String,
    reuired: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

var taskSchema = mongoose.Schema({
  creatorId: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  due_date: {
    type: Date,
    required: true,
  },
  priority: {
    type: String,
    default: "low", //high,medium, low
  },
  status: {
    //open, inprogress, completed
    type: String,
    default: "Open",
  },
  creators: {
    type: [RoleSchema],
    deafult: [],
  },
  collaborators: {
    type: [RoleSchema],
    default: [],
  },
  viewers: {
    type: [RoleSchema],
    default: [],
  },
  workers: [workersSchema],
});

const Task = mongoose.model("Task", taskSchema);

export default Task;
