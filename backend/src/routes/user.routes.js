import express from "express";
import { clerksClient } from "../lib/clerkClient.js";
import { ClerkExpressWithAuth } from "@clerk/clerk-sdk-node";
import {
  createUserWithRole,
  deleteUser,
  getAllUsers,
} from "../controllers/Auth.controllers.js";

const router = express.Router();

router.get("/all-users", ClerkExpressWithAuth({}), getAllUsers);
router.post("/role", ClerkExpressWithAuth({}), createUserWithRole);
router.delete("/delete-user", ClerkExpressWithAuth({}), deleteUser);

export default router;
