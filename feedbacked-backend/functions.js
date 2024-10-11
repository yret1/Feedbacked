const bcrypt = require("bcrypt");

const User = require("./schemas/usermodel.ts");

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

exports.addClient = async (req, res) => {};

exports.updateClientStatus = async (req, res) => {};

exports.deleteClient = async (req, res) => {};

exports.getClients = async (req, res) => {};

exports.getClient = async (req, res) => {};

exports.updateClient = async (req, res) => {};

exports.addFeedback = async (req, res) => {};

exports.getFeedbacks = async (req, res) => {};
