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
  deleteKey, setAgencyName,
} = require("./functions");
const { checkAuth } = require("./middlewares");
const router = app.Router();

//Auth routes
router.post("/sign-up", signupUser);
router.post("/login", loginUser);
router.post("/get-user", checkAuth, getUser);

//Client routes
router.post("/add-client", checkAuth, addClient);
router.post("/update-client-status", checkAuth, updateClientStatus);
router.post("/get-clients", checkAuth, getClients);
router.post("/get-client", checkAuth, getClient);
router.post("/create-key", checkAuth, initializeKey);
router.post("/delete-key", checkAuth, deleteKey);
router.post("/setUName", checkAuth, setAgencyName);

//Plugin routes

router.post("/newfeedback", addFeedback);

//Add issue + some kind of auth?

module.exports = router;
