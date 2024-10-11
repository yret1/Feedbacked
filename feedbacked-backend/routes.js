const app = require("express");
const { signupUser, loginUser } = require("./functions");
const router = app.Router();

router.post("/sign-up", signupUser);
router.post("/login", loginUser);

module.exports = router;
