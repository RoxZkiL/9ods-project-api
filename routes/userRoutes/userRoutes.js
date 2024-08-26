const express = require("express");
const router = express.Router();
const register = require("../../controllers/userControllers/registerController");
const login = require("../../controllers/userControllers/loginController");
const {
  requestResetPassword,
  resetPassword,
} = require("../../controllers/userControllers/passwordResetController");
const {
  validateLogin,
  validateRegister,
  validateResetPassword,
  validateRequestResetPassword,
} = require("../../middlewares/userMiddlewares/validatorMiddleware");
//const authenticate = require("../../middlewares/userMiddlewares/authMiddleware");

router.post("/register", validateRegister, register);

router.post("/login", validateLogin, login);

router.post(
  "/request-password-reset",
  validateRequestResetPassword,
  requestResetPassword
);

router.put("/reset-password", validateResetPassword, resetPassword);

module.exports = router;
