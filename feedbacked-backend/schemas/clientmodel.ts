const mongo = require("mongoose");

const clientModel = new mongo.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: false },
  status: { type: String, required: true, default: "active" },
  url: {type: String, required: true},
  issues: [],
  created_at: { type: Date, default: Date.now },
});

module.exports = mongo.model("Client", clientModel);
