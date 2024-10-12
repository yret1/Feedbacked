const app = require("express");
const {
  signupUser,
  loginUser,
  addClient,
  updateClientStatus,
} = require("./functions");
const router = app.Router();

router.post("/sign-up", signupUser);
router.post("/login", loginUser);
router.post("/add-client", addClient);
router.post("/update-client-status", updateClientStatus);

module.exports = router;
