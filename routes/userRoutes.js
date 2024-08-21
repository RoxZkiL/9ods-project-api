const express = require("express");
const router = express.Router();
const register = require("../controllers/registerController");
const login = require("../controllers/loginController");
const {
  requestResetPassword,
  resetPassword,
} = require("../controllers/passwordResetController");
const authenticate = require("../middlewares/authMiddleware");

router.post("/register", register);

router.post("/login", login);

router.post("/request-password-reset", requestResetPassword);

router.put("/reset-password", resetPassword);

module.exports = router;
