const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utils/utils");

const requestResetPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findByEmail(email);

    if (!user) {
      return res
        .status(400)
        .json({ message: "User with this email does no exist" });
    }

    const resetPasswordToken = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    const resetLink = `${process.env.CLIENT_URL}/reset-password?token=${resetPasswordToken}`;

    const emailContent = `
      <p>Hola ${user.name}</p>
      <p>¿Olvidaste tú contraseña?</p>
      <p>Accede a este enlace <a href="${resetLink}">link</a> para recuperar tu contraseña</p>
    `;

    const sentMail = await sendEmail(
      email,
      "Recuperar Contraseña",
      emailContent
    );

    res.status(200).json({ message: "Email sent successfully", sentMail });
  } catch (error) {
    console.error("Error sending reset password email", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { newPassword, confirmNewPassword } = req.body;

  const token = req.headers.authorization?.split(" ")[1];

  if (newPassword !== confirmNewPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const passwordRegExValidator = /(?=.*[a-zA-Z]).{6,}/;

  if (!passwordRegExValidator.test(newPassword)) {
    return res.status(400).json({
      message: "Password must be at least 6 characters and contain a letter",
    });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatePassword = await User.updatePassword(
      decodedToken.email,
      hashedPassword
    );

    res.status(200).json({
      message: "Password has been updated successfully",
      updatePassword,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Invalid or expired token", error: error.message });
  }
};

module.exports = { requestResetPassword, resetPassword };
