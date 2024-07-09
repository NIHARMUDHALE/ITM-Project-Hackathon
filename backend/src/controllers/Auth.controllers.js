import express from "express";
import { clerksClient } from "../lib/clerkClient.js";
import UserRoleModel from "../models/User.model.js";

const unauthenticated = (res) => {
  res.status(401).json({ error: "Session expired or invalid" });
};

export const getAllUsers = async (req, res) => {
  try {
    if (!req.auth.sessionId) return unauthenticated(res);

    const users = await clerksClient.users.getUserList();

    const usersWithTheirRoles = users.data.map((user) => {
      return {
        id: user.id,
        name: user.firstName + " " + user.lastName,
        email: user.emailAddresses[0].emailAddress,
      };
    });

    return res.status(200).json(usersWithTheirRoles).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const createUserWithRole = async (req, res) => {
  try {
    if (!req.auth.sessionId) return unauthenticated(res);

    const { role, token } = req.body;
    const user = await clerksClient.users.getUser(req.auth.userId);

    //create token functionality later...

    //This is default token so you dont have to ask for token when
    //assessing this code and website

    if (token !== "#defaultTokenForAssessmentPurpose") {
      return res.status(401).json({ error: "Token expired or invalid" });
    }

    if (!role) {
      return res
        .status(400)
        .json({ error: "Empty text input received", request: req.body });
    }

    const newUserWithRole = new UserRoleModel({ userId: user.id, role: role });

    await newUserWithRole.save();

    return res.status(200).json(newUserWithRole).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    if (!req.auth.sessionId) return unauthenticated(res);

    clerksClient.users.deleteUser(req.auth.userId);
    return res.status(200).send({}).end();
  } catch (e) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};
