const app = require("express");
const {
  signupUser,
  loginUser,
  addClient,
  updateClientStatus,
  getClients,
  getClient,
} = require("./functions");
const router = app.Router();

router.post("/sign-up", signupUser);
router.post("/login", loginUser);
router.post("/add-client", addClient);
router.post("/update-client-status", updateClientStatus);
router.post("/get-clients", getClients);
router.post("/get-client", getClient);
module.exports = router;
