const app = require("express");
const { signupUser } = require("./functions");
const router = app.Router();

router.post("/sign-up", signupUser);

module.exports = router;
