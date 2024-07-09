import mongoose from "mongoose";

// Define the collaborator schema
const collaboratorSchema = new mongoose.Schema({
  collaboratorId: String,
  text: String,
  tags: String,
});

// Define the creator schema
const creatorSchema = new mongoose.Schema({
  creatorId: String,
  text: String,
  tags: String,
});

// Define the comment schema
const commentSchema = new mongoose.Schema({
  taskId: String,
  taskCreatorId: {
    type: String,
    required: true,
  },
  collaborators: [collaboratorSchema], // Array of collaborators
  creators: [creatorSchema], // Array of creators
});

// Create the Comment model
const Comment = mongoose.model("Comment", commentSchema);

export default Comment;
