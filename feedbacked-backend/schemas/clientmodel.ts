const mongo = require("mongoose");

const clientModel = new mongo.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  status: { type: String, required: true, default: "active" },
  issues: [],
  created_at: { type: Date, default: Date.now },
});

module.exports = mongo.model("Client", clientModel);
