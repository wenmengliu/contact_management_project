const jwt = require("jsonwebtoken");
const { secretKey, sampleUser } = require("../config/jwt");
const auth = require("../middleware/auth");

// login user with sample data
// in this code, it skips login user account authentication and use the sample user directly
// this is only for testing and development
const loginUser = async (req, res) => {
  try {
    // Replace this with your actual login logic, which may involve database queries
    // Simulating a successful login for the sample user

    const { email, password } = req.body;

    if (email === sampleUser.email && password === sampleUser.password) {
      // If the credentials match, generate a JWT token for the user
      const token = jwt.sign({ user: sampleUser }, secretKey, {
        expiresIn: "1h", // Token expiration time (e.g., 1 hour)
      });

      const user = { name: sampleUser.username, password: undefined };
      // Return the token as a response with a 200 status code
      res.status(200).json({ token, user });
    } else {
      // If the credentials don't match, return an unauthorized response
      res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginedUser = async (req, res) => {
  return res.status(200).json({ ...req.user._doc });
};

module.exports = {
  loginUser,
  hasLogined: [auth, loginedUser],
};
