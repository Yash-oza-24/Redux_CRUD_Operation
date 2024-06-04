const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// Function to generate JWT token
const generateAuthToken = (user) => {
  return jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

const createUser = async (req, res) => {
  try {
    // Destructure additionalFunctionalities from the request body
    const { username, email, password, role, phoneNumber, functionalities } = req.body;
    console.log(req.body);

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user object
    const user = new User({
      username,
      email,
      password,
      role,
      phoneNumber,
      accessRights: functionalities // Store the selected functionalities in the database
    });

    // Save the user to the database
    await user.save();

    // Return success response
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    // Handle errors
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password, phoneNumber } = req.body;
    let user;
    console.log("user", email, password, phoneNumber);

    if (email) {
      user = await User.findOne({ email });
    } else if (phoneNumber) {
      user = await User.findOne({ phoneNumber });
    }

    if (!user || (password && !await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    if (!user._id) {
      return res.status(401).json({ message: "User ID not found" });
    }

    const token = generateAuthToken(user);

    res.status(200).json({ message: "Login successful", user, token });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    const userCount = users.length;
    res.status(200).json({ totalUsers: userCount, users });
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: error.message });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({ message: "User deleted successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const updateData = req.body;

    // Check if the request contains updated functionalities
    if (updateData.functionalities) {
      updateData.accessRights = updateData.functionalities;
      delete updateData.functionalities; // Remove functionalities from updateData
    }
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });
    res.json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  createUser,
  loginUser,
  getAllUsers,
  deleteUserById,
  updateUserById,
}; 
