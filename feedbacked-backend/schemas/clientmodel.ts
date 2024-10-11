const clientModel = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  issues: [],
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Client", clientModel);
