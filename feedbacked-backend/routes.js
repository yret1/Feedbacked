import app from "express";
import {
  addClient,
  createPersonalKey,
  deleteKey,
  getClient,
  getClients,
  getFeedback,
  getUser,
  initializeKey,
  killPersonalKey,
  killTargetGithubIntegration,
  loginUser,
  resolveFeedback,
  setAgencyName,
  signupUser,
  targetGithubIntegration,
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
router.get("/getFeedback/:userId/:issueId/:clientId", checkAuth, getFeedback);

router.put("/resolveFeedback", checkAuth, resolveFeedback);

//Githubkey
router.post("/createpersonaltoken", checkAuth, createPersonalKey);
router.delete("/deletepersonaltoken", checkAuth, killPersonalKey);
router.post("/addTarget", checkAuth, targetGithubIntegration);
router.patch("/removeTarget", checkAuth, killTargetGithubIntegration);

//Plugin routes

router.post("/newfeedback", addFeedback);

//Add issue + some kind of auth?

export default router;
