const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authenticateToken = require("../middleware/auth"); // Import the middleware

// Route for user registration
router.post("/register", userController.registerUser);

router.post("/login", userController.loginUser);

// Route for fetching all users
router.get("/users", authenticateToken, userController.getAllUsers); // Apply the middleware

// GET /auth/me
router.get("/auth/me", authenticateToken, userController.getUser);


module.exports = router;
