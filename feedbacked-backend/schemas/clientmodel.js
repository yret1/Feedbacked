import mongoose from "mongoose";
import { IssueModel } from "./issuemodel.js";

//Defines a strict type for each client nested in a user account
const clientModel = new mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  status: { type: String, default: "active" },
  url: { type: String, required: true },
  feedbacks: [
    {
      type: IssueModel,
    },
  ],
  keys: [],
});

const Client = mongoose.model("Client", clientModel);

export { Client, clientModel };
