import mongoose from "mongoose";
import { v4 as uuidv4 } from "uuid";

//Defines strict type for any issue to be added.
const IssueModel = new mongoose.Schema({
  id: { type: String, default: uuidv4() },
  title: { type: String, required: true },
  by: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
  status: {
    type: String,
    required: true,
    default: "Unresolved",
  },
  created_at: { type: Date, default: Date.now },
});

const Issue = mongoose.model("Issue", IssueModel);

export { Issue, IssueModel };
