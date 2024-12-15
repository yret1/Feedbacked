import app from "express";
import {
  addClient,
  deleteKey,
  getClient,
  getClients,
  getUser,
  initializeKey,
  loginUser,
  setAgencyName,
  signupUser,
  updateClientStatus,
} from "./controllers/userFunctions.js";
import { addFeedback } from "./controllers/pluginFunctions.js";

import { checkAuth } from "./middlewares.js";
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

export default router;
