const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const fetchContact = require("../controllers/contactController").fetchContact;
const createContact = require("../controllers/contactController").createContact;
const updateContact = require("../controllers/contactController").updateContact;
const login = require("../controllers/authController").loginUser;
const hasLogined = require("../controllers/authController").hasLogined;

//Define a route to handle the inital page
router.get("/", fetchContact);

// Define a route to create a contact given a public user with or without login
router.post("/create-contact", createContact);

//Define a route to update a contact after login - protected by auth middleware
router.put("/update-contact/:id", auth, updateContact);

//Define a route for user login
router.post("/login", login);

//Define a route for a user that has already logined
router.get("/me", auth, hasLogined);

module.exports = router;
