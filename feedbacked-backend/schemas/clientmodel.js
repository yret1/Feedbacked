import mongoose from "mongoose";
import { IssueModel } from "./issuemodel.js";

const clientModel = new mongoose.Schema({
  name: { type: String, required: true },
  email: String,
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
