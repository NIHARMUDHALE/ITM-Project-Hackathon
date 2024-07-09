import mongoose from "mongoose";

const userRoleSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
});

const UserRoleModel = mongoose.model("UserRole", userRoleSchema);

export default UserRoleModel;
