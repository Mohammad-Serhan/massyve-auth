const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const dotenv = require("dotenv");
const envFound = dotenv.config();

if (envFound.error) {
	throw new Error("Couldn't find .env file ⚠️");
}


// Register a new user
exports.registerUser = async (req, res) => {
  const { name, lastName, email, password } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const user = await User.create({
		name,
		lastName,
		email,
		password: hashedPassword,
	});

    res.status(201).json({ message: "User created successfully  .", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error creating user !" });
  }
};

// Login a user
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
//   console.log(email, password)
  try {
		// Find user by email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(401).json({ message: "Invalid email" });
		}

		// Compare the password with the hashed password
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			return res.status(401).json({ message: "password is incorrect" });
		}

		// Generate JWT token
        
		const token = jwt.sign({ user: user }, process.env.token, {
			expiresIn: "1h",
		});

		res.status(200).json({
			authenticated: true,
			token
		});
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in" });
  }
};



// Get all users
exports.getAllUsers = async (req, res) => {
  try {
		const users = await User.find(); // Mongoose method to retrieve all users
		res.status(200).json({
			users: users,
		});
  } catch (error) {
		console.error(error);
		res.status(500).json({
			message: error.message,
		});
  }
};


// Get 1 user
exports.getUser = async (req, res) => {
  try {
		const user = await User.findById(req.user._id);
        // console.log( user+"------------------- get USer");
		res.status(200).json({
			user: user,
		});
  } catch (error) {
		console.error(error);
		res.status(500).json({
			message: error.message,
		});
  }
};
