import express from "express";
import connectToDB from "./configs/db.config.js";
import bodyParser from "body-parser";
import "dotenv/config";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";
import { createServer } from "node:http";
import { Server } from "socket.io";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import * as taskControllers from "./controllers/Task.controller.js";
const app = express();
const httpServer = createServer(app);
let startTime = null;
const port = 8085;
import { clerkClient } from "@clerk/clerk-sdk-node";
import * as commentController from "./controllers/Comment.controller.js";

const io = new Server(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL, // Set this to your frontend URL
    methods: ["GET", "POST"], // Specify allowed HTTP methods
  },
});

app.use(cors({ origin: [process.env.FRONTEND_URL] }));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use(express.json());
app.use(function (_, res, next) {
  res.setHeader(
    "Access-Control-Allow-Headers",
    "accept, authorization, content-type, x-requested-with",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.setHeader("Content-Type", "application/json");
  next();
});

//TO convert data into json format
app.use(express.json());

//User routes
app.use("/api/user", userRoutes);

io.on("connection", (socket) => {
  socket.use(async (packet, next) => {
    const { sessionId, userId } = socket.handshake.auth;

    try {
      const session = await clerkClient.sessions.getSession(sessionId);
      if (!session) {
        io.emit("sessionStatus", {
          success: false,
          message: "Session not found!",
        });
      }
      if (session.expireAt <= Date.now()) {
        io.emit("sessionStatus", {
          success: false,
          message: "Session Expired",
        });
      } else {
        io.emit("sessionStatus", {
          success: false,
          message: "Session Expired",
        });
      }
    } catch (error) {
      console.error("Error fetching session:", error);
      io.emit("sessionStatus", {
        success: false,
        message: "Error fetching session",
      });
    }

    next();
  });
  //Creating task
  socket.on("task:create", (task) => {
    console.log("socket task create");
    taskControllers.createTask(io, task);
  });

  socket.on("task:getall", () => {
    taskControllers.getAllTasks(io);
  });

  socket.on("task:gettaskbyid", (id) => {
    taskControllers.getTaskById(io, id);
  });

  socket.on("task:updatetask", (task) => {
    taskControllers.updateTask(io, task);
  });

  socket.on("task:delete", (id) => {
    taskControllers.deleteTask(io, id);
  });

  socket.on("comment:createcomment", (comment) => {
    commentController.createComment(io, comment);
  });
  socket.on("comment:getallcomments", (taskId) => {
    console.log("taskId", taskId);
    commentController.getAllComments(io, taskId);
  });
});

// const route  = app.get('/api', );

httpServer.listen(port, async () => {
  console.log(`\x1b[33m→ Connecting to Database...\x1b[0m`);
  connectToDB();
  console.log(`\x1b[32m → Connected.\x1b[0m`);
  console.log(`\x1b[32mTodoFEM API listening on port ${port}\x1b[0m`);
  startTime = new Date();
});
