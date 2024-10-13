const mong = require("mongoose");

const IssueModel = new mong.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
  status: { type: String, required: true, default: "active" },
  created_at: { type: Date, default: Date.now },
});

module.exports = mong.model("Issue", IssueModel);
