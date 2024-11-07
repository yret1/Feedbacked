const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: { type: String, required: false },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  clients: [
    {
      name: String,
      email: String,
      phone: String,
      status: String,
      feedbacks: [],
      keys: [],
    },
  ],
  created_at: { type: Date, default: Date.now },
});
userSchema.plugin(uniqueValidator);

module.exports = mongoose.model("User", userSchema);
