import mongoose from "mongoose";
import { clientModel } from "./clientmodel.js";

//Defines strict type for any user account.
const userSchema = new mongoose.Schema({
  username: { type: String, required: false },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  clients: {
    type: [clientModel],
    required: false,
    default: [],
  },
  created_at: { type: Date, default: Date.now },
  settings: {
    integrations: [
      {
        title: { type: String, required: true },
        token: { type: String, required: true },
        updated_on: { type: Date, default: Date.now() },
      },
    ],
    payment: {
      currentPlan: { type: String, default: "Trial" },
      stripePlan: { type: String, default: "Monthly" },
      activeUntil: { type: Date },
    },
  },
});

const User = mongoose.model("User", userSchema);

export default User;
