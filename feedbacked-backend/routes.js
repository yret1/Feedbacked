const app = require("express");
const {
  signupUser,
  loginUser,
  addClient,
  updateClientStatus,
  getClients,
  getClient,
  addFeedback,
  getUser,
  initializeKey,
  deleteKey,
} = require("./functions");
const router = app.Router();

//Auth routes
router.post("/sign-up", signupUser);
router.post("/login", loginUser);
router.post("/get-user", getUser);

//Client routes
router.post("/add-client", addClient);
router.post("/update-client-status", updateClientStatus);
router.post("/get-clients", getClients);
router.post("/get-client", getClient);
router.post("/create-key", initializeKey);
router.delete("/delete-key", deleteKey);

//Plugin routes

router.post("/newfeedback", addFeedback);

//Add issue + some kind of auth?

module.exports = router;
