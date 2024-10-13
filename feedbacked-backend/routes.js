const app = require("express");
const {
  signupUser,
  loginUser,
  addClient,
  updateClientStatus,
  getClients,
  getClient,
  addFeedback,
} = require("./functions");
const router = app.Router();

//Auth routes
router.post("/sign-up", signupUser);
router.post("/login", loginUser);

//Client routes
router.post("/add-client", addClient);
router.post("/update-client-status", updateClientStatus);
router.post("/get-clients", getClients);
router.post("/get-client", getClient);

//Plugin routes

router.post("/newfeedback", addFeedback);

//Add issue + some kind of auth?

module.exports = router;
