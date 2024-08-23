const User = require("../models/userModel");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const { name, email, password, is_admin } = req.body;

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
