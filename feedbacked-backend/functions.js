const bcrypt = require("bcrypt");

exports.signupUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  const hashPass = bcrypt.hash(password, 10);

  const userModel = new userSchema({
    email: email,
    password: hashPass,
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
      res.status(500).json({ message: "Error creating user" });
    });
};
