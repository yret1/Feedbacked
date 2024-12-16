import User from "../schemas/usermodel.js";
import { Client } from "../schemas/clientmodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";
//Sign up a new agency user
export const signupUser = async (req, res) => {
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

//Log in agency user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  let userFound;

  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({ message: "User does not exist. Create an account!" });
      }

      userFound = user;
      return bcrypt.compare(password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(400).json({ message: "Invalid password" });
      }

      const token = jwt.sign(
        { email: email, userId: userFound._id },
        "potatoe",
        { expiresIn: "1h" }
      );
      return res.status(200).json({
        token: token,
        userId: userFound._id,
        expiresIn: 3600,
      });
    });
};

//Retrive agency user
export const getUser = async (req, res) => {
  const { userId } = req.body;

  const user = await User.findById(userId);

  return res.status(200).json({ user: user });
};

//Add new client to agency account
export const addClient = async (req, res) => {
  const { clientName, clientEmail, clientUrl, userId } = req.body;

  console.log("Path hit");

  if (!clientName || !clientEmail) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }

    const id = await uuidv4();

    const clientModel = new Client({
      id: id,
      name: clientName,
      email: clientEmail,
      url: clientUrl,
      feedbacks: [],
      keys: [],
      created_at: new Date(),
    });

    user.clients.push(clientModel);

    await user.save();

    res
      .status(201)
      .json({ message: "Client added successfully", clientId: id });
  } catch (err) {
    return res
      .status(500)
      .json({ message: "Error Adding Client", error: err.message });
  }
};

//Delete a client (DANGER) //TODO: Implement logic

export const deleteClient = async (req, res) => {};

//Update status of specific client

export const updateClientStatus = async (req, res) => {
  const { userId, clientEmail, newStatus } = req.body;

  if (!userId || !clientEmail || !newStatus) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    const user = await User.findById(userId);

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

//Retrive all clients for an entire agency

export const getClients = async (req, res) => {
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

//Retrive specific client

export const getClient = async (req, res) => {
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
      const client = await user.clients.find(
        (client) => client.email === clientEmail
      );

      if (client) {
        return res
          .status(200)
          .json({ message: "Client found", client: client });
      } else {
        return res.status(404).json({ message: "Client not found" });
      }
    }
  } catch (error) {
    console.error("Error getting clients:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

//Update specific client

export const updateClient = async (req, res) => {};

//Assing and create client keys
export const initializeKey = async (req, res) => {
  const { userId, clientName, clientEmail } = req.body;

  const key = uuid();

  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({
      message: "Could not find your dataconnection. Please contact support",
    });
  } else {
    const userPlan = user.plan;
    let allowedKeys = null;

    switch (userPlan) {
      case "base":
        allowedKeys = 1;
        break;
      case "large":
        allowedKeys = 3;
        break;
      case "enterprise":
        allowedKeys = 10;
        break;
    }

    const client = await user.clients.find(
      (client) => client.email === clientEmail
    );
    const keyObject = {
      key: key,
      for: clientName,
      clientEmail: clientEmail,
      created_at: new Date(),
    };
    if (client) {
      if (client.keys.length < allowedKeys) {
        return res.status(400).json({
          message:
            "You have reached the maximum number of keys for this client",
        });
      } else {
        client.keys.push(keyObject);
        await user.save();
        return res.status(200).json({ message: "Key generated", key: key });
      }
    }
  }
};

//Remove added key
export const deleteKey = async (req, res) => {
  const { userId, clientEmail, key } = req.body;

  const user = await User.findById(userId);

  const client = await user.clients.find(
    (client) => client.email === clientEmail
  );

  const keytarget = await client.keys.find((keys) => keys.key === key);

  if (keytarget) {
    client.keys = client.keys.filter((target) => target.key !== key);
    await user.save();
    return res.status(200).json({ message: "Key deleted" });
  } else {
    return res.status(400).json({ message: "Key not found" });
  }
};

//Update name for an agency
export const setAgencyName = async (req, res) => {
  try {
    const { userId, agencyName } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username: agencyName },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Updated agency name successfully",
      agencyName,
      user: updatedUser,
    });
  } catch (error) {
    console.error("Error updating username:", error);
    return res.status(500).json({
      message: "Error updating username",
      error: error.message,
    });
  }
};

//Retrevie all feedback for a specific client

export const getFeedbacks = async (req, res) => {};
