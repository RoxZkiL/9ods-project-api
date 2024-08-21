const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, confirmEmail, password, confirmPassword, is_admin } =
    req.body;

  if (email !== confirmEmail) {
    return res.status(400).json({ message: "Email do not match" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const passwordRegExValidator = /(?=.*[a-zA-Z]).{6,}/; //Valida si la contraseña tiene 6 caracteres y al menos 1 letra.

  if (!passwordRegExValidator.test(password)) {
    return res.status(400).json({
      message: "Password must be at least 6 characters and contain a letter",
    });
  }

  try {
    const existingUser = await User.findByEmail(email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.createUser(
      name,
      email,
      hashedPassword,
      is_admin
    );

    res
      .status(201)
      .json({ message: "User created successfully", newUser: newUser });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

module.exports = register;
