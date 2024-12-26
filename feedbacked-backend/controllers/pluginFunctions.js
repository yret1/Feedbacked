import User from "../schemas/usermodel.js";
import { v4 as uuidv4 } from "uuid";

export const addFeedback = async (req, res) => {
  const {
    userId,
    clientId,
    feedbackTitle,
    feedbackBody,
    ImageUrl,
    by,
    errors,
    warnings,
    device,
  } = req.body;

  console.log(req.body);
  if (!userId || !clientId || !feedbackTitle) {
    return res.status(400).json({
      message:
        "Please enter a valid userId, clientId and a title for the submitted issue",
    });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const client = user.clients.find((client) => client.id === clientId);

    if (!client) {
      return res.status(404).json({
        message: "Client not found",
      });
    }

    const feedback = {
      id: uuidv4(),
      title: feedbackTitle,
      description: feedbackBody,
      errors: errors,
      warnings: warnings,
      by: by,
      image: ImageUrl,
      device: device,
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
