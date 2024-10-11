const IssueModel = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: false },
  status: { type: String, required: true, default: "active" },
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Issue", IssueModel);
