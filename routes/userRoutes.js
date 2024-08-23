const express = require("express");
const router = express.Router();
const register = require("../controllers/registerController");
const login = require("../controllers/loginController");
const {
  requestResetPassword,
  resetPassword,
} = require("../controllers/passwordResetController");
const {
  validateLogin,
  validateRegister,
  validateResetPassword,
  validateRequestResetPassword,
} = require("../middlewares/validatorMiddleware");
const authenticate = require("../middlewares/authMiddleware");

router.post("/register", validateRegister, register);

router.post("/login", validateLogin, login);

router.post(
  "/request-password-reset",
  validateRequestResetPassword,
  requestResetPassword
);

router.put("/reset-password", validateResetPassword, resetPassword);

module.exports = router;
