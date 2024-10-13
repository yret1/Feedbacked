const bcrypt = require("bcrypt");
const { uuid } = require("uuidv4");
const User = require("./schemas/usermodel.ts");
const Client = require("./schemas/clientmodel.ts");

exports.signupUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  const hashPass = bcrypt.hash(password, 10).then((hash) => {
    const userModel = new User({
      email: email,
      password: hash,
      username: "",

      clients: [],
      created_at: new Date(),
    });

    userModel
      .save()
      .then(() => {
        res.status(201).json({ message: "User created successfully" });
      })
      .catch((err) => {
        res.status(500).json({ message: "Error creating user", error: err });
      });
  });
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  User.findOne({ email: email }).then((user) => {
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist. Create an account!" });
    } else {
      bcrypt.compare(password, user.password).then((isMatch) => {
        if (!isMatch) {
          return res.status(400).json({ message: "Invalid password" });
        } else {
          res
            .status(200)
            .json({ message: "User logged in successfully", result: user });
        }
      });
    }
  });
};

exports.addClient = async (req, res) => {
  const { clientName, clientEmail, clientPhone, clientStatus, userId } =
    req.body;

  if (!clientName || !clientEmail || !clientStatus) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const clientModel = new Client({
      name: clientName,
      email: clientEmail,
      phone: clientPhone,
      status: clientStatus,
      feedbacks: [],
      created_at: new Date(),
    });

    user.clients.push(clientModel);

    await user.save();

    res
      .status(201)
      .json({ message: "Client added successfully", client: clientModel });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error Adding Client", error: err.message });
  }
};

exports.updateClientStatus = async (req, res) => {
  const { studioId, clientEmail, newStatus } = req.body;

  if (!studioId || !clientEmail || !newStatus) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const user = await User.findById(studioId);

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if (user.clients.length === 0) {
      return res.status(400).json({ message: "No clients found" });
    }

    const clientIndex = user.clients.findIndex(
      (client) => client.email === clientEmail
    );

    if (clientIndex === -1) {
      return res.status(400).json({ message: "Client not found" });
    }

    user.clients[clientIndex].status = newStatus;
    user.markModified("clients");

    await user.save();

    return res.status(200).json({
      message: "Client status updated successfully",
      client: user.clients[clientIndex],
    });
  } catch (error) {
    console.error("Error updating client status:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.deleteClient = async (req, res) => {};

exports.getClients = async (req, res) => {
  const { userId } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if (user.clients.length === 0) {
      return res.status(400).json({ message: "No clients found", clients: [] });
    } else {
      return res
        .status(200)
        .json({ message: "Clients found", clients: user.clients });
    }
  } catch (error) {
    console.error("Error getting clients:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.getClient = async (req, res) => {
  const { userId, clientEmail } = req.body;

  if (!userId) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    if (user.clients.length === 0) {
      return res
        .status(400)
        .json({ message: "Could not find client", clients: [] });
    } else {
      const client = user.clients.find(
        (client) => client.email === clientEmail
      );
      return res.status(200).json({ message: "Client found", client: client });
    }
  } catch (error) {
    console.error("Error getting clients:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

exports.updateClient = async (req, res) => {};
exports.addFeedback = async (req, res) => {
  const { userId, clientEmail, feedbackTitle, feedbackBody, ImageUrl } =
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
      id: uuid(),
      title: feedbackTitle,
      body: feedbackBody,
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
exports.getFeedbacks = async (req, res) => {};
