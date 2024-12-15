import mongoose from "mongoose";

type statusType = "Unresolved" | "Resolved";

const IssueModel = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
  status: {
    type: "String" as statusType,
    required: true,
    default: "Unresolved",
  },
  created_at: { type: Date, default: Date.now },
});

const Issue = mongoose.model("Issue", IssueModel);

export default Issue;
