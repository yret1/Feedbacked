import mongoose from "mongoose";

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

const User = mongoose.model("User", userSchema);

export default User;
