const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "No token",
    });
  }

  try {
    const decoded = jwt.verify(
      token,
      "secretkey"
    );

    req.userId = decoded.id;

    next();
  } catch {
    res.status(401).json({
      message: "Invalid token",
    });
  }
}

module.exports = auth;