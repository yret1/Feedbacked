import User from "../schemas/usermodel.js";
import { v4 as uuidv4 } from "uuid";

export const addFeedback = async (req, res) => {
  const { userId, clientEmail, feedbackTitle, feedbackBody, ImageUrl, by } =
    req.body;

  if (!userId || !clientEmail || !feedbackTitle) {
    return res.status(400).json({
      message:
        "Please enter a valid userId, clientEmail and a title for the submitted issue",
    });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const client = user.clients.find((client) => client.email === clientEmail);

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    const feedback = {
      id: uuidv4(),
      title: feedbackTitle,
      description: feedbackBody,
      by: by,
      image: ImageUrl,
      created_at: new Date(),
    };

    client.feedbacks.push(feedback);

    await user.save();

    return res.status(201).json({ message: "Feedback added successfully" });
  } catch (error) {
    console.error("Error adding feedback:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
