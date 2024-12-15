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
      feedbacks: [
        {
          title: { type: String, required: true },
          description: { type: String, required: true },
          image: { type: String, required: false },
          status: {
            type: String,
            required: true,
            default: "Unresolved",
          },
          created_at: { type: Date, default: Date.now },
        },
      ],
      keys: [],
    },
  ],
  created_at: { type: Date, default: Date.now },
});

const User = mongoose.model("User", userSchema);

export default User;
