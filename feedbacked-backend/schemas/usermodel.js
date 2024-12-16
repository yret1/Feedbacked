import mongoose from "mongoose";
import { clientModel } from "./clientmodel.js";

//Defines strict type for any user account.
const userSchema = new mongoose.Schema({
  username: { type: String, required: false },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  clients: [{ type: clientModel }],
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
