const jwt = require("jsonwebtoken");

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Authorization denied, empty token" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token with verification:", decoded);
    req.user = {
      id: decoded.id,
      name: decoded.name,
      is_admin: decoded.is_admin,
    };
    next();
  } catch (error) {
    res.status(401).json({ message: "Token is not valid", error });
  }
};

module.exports = authenticate;
