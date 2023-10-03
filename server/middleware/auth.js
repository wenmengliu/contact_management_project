const jwt = require("jsonwebtoken");
const { secretKey } = require("../config/jwt");

module.exports = (req, res, next) => {
  const token = req.header("Authorization"); // Assuming the token is sent in the "Authorization" header

  console.log(jwt.verify(token, secretKey));

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - No token provided" });
  }

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded.user; // Attach user data to the request object
    next();
  } catch (error) {
    return res.status(401).json({ error: "Unauthorized - Invalid token" });
  }
};
