import Comment from "../models/Comments.model.js";
import Task from "../models/Task.model.js";
import { clerkClient } from "@clerk/clerk-sdk-node";

export const createComment = async (io, comment) => {
  try {
    const task = await Task.findOne({ _id: comment.taskId });
    if (!task) {
      io.emit({ success: false, message: "Task does not exist" });
      return;
    }

    const existingComment = await Comment.findOne({ taskId: comment.taskId });

    if (existingComment) {
      // Concatenate collaborators and creators arrays
      existingComment.collaborators = existingComment.collaborators.concat(
        comment.collaborators,
      );
      existingComment.creators = existingComment.creators.concat(
        comment.creators,
      );

      await existingComment.save();
      const allComments = await allCommentsHelper(
        existingComment,
        existingComment.taskId,
      );
      console.log("creaotrs from existing", allComments.creators[0]);
      io.emit("getComments", allComments);
    } else {
      // Create a new comment
      const newComment = {
        taskId: comment.taskId,
        taskCreatorId: task.creatorId,
        collaborators: comment.collaborators ? task.collaborators : [],
        creators: comment.creators ? comment.creators : [],
      };

      const comm = new Comment(newComment);
      await comm.save();

      const allComments = await allCommentsHelper(comm, comment.taskId);
      console.log("creaotrs from new", allComments.creators[0]);

      io.emit("getComments", allComments);
    }

    return;
  } catch (e) {
    io.emit({ success: false, message: e });
    return;
  }
};

export const getAllComments = async (io, taskId) => {
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    io.emit({ success: false, message: "Task does not exist" });
    return;
  }

  const existingComment = await Comment.findOne({ taskId: taskId });

  const allComments = await allCommentsHelper(
    existingComment,
    existingComment.taskId,
  );
  io.emit("getComments", allComments);
};

const allCommentsHelper = async (comm, taskId) => {
  const allComments = {
    taskId: taskId,
    taskCreatorId: comm.taskCreatorId,
    collaborators: [],
    creators: [],
  };

  if (comm.collaborators[0] !== null) {
    for (const collaborator of comm.collaborators) {
      const user = await clerkClient.users.getUser(collaborator.collaboratorId);

      const newCollaborator = {
        collaboratorId: collaborator.collaboratorId,
        name: user.firstName + " " + user.lastName,
        collaborators: collaborator.collaboratorId,
        text: collaborator.text,
        tags: collaborator.tags,
      };

      allComments.collaborators.push(newCollaborator);
    }
  }

  if (comm.creators[0] !== null) {
    for (const creators of comm.creators) {
      const user = await clerkClient.users.getUser(creators.creatorId);
      const newCreator = {
        creatorId: creators.creatorId,
        name: user.firstName + " " + user.lastName,
        creators: creators.creatorId,
        text: creators.text,
        tags: creators.tags,
      };

      allComments.creators.push(newCreator);
    }
  }
  return allComments;
};
