const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  clients: [
    {
      name: String,
      email: String,
      phone: String,
      feedbacks: [
        {
          feedback: String,
          message: String,
          image: String,
          created_at: { type: Date, default: Date.now },
        },
      ],
    },
  ],
  created_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
