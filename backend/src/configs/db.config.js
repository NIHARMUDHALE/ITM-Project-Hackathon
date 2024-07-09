import "dotenv/config";
import mongoose from "mongoose";

const MONGO_URL = process.env.MONGO_URL;

async function connectToDB() {
  try {
    await mongoose.connect(MONGO_URL);
    console.log("Successfully connected to database");
  } catch (e) {
    console.log(e);
  }
}

export default connectToDB;
