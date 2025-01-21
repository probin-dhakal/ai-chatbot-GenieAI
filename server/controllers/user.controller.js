import User from "../models/user.js";
import validator from "validator";
import bcrypt from "bcryptjs";
import { sendWelcomeEmail } from "../utils/sendEmail.js";
import { sendToken } from "../utils/sendToken.js";

// Register Controller
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

  
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

   
    if (!validator.isEmail(email)) {
      return res
        .status(400)
        .json({ message: "Please provide a valid email address." });
    }

   
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User already exists. Please use a different email.",
      });
    }

 
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword, // Ensure this matches your model schema
    });

    
    await sendWelcomeEmail(email);

   
    sendToken(newUser, 201, res, "User registered successfully");
  } catch (error) {
    console.error("Error in register controller:", error.message);
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

// Login Controller
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input fields
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Find user by email
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }

    // Send token
    sendToken(user, 200, res, "User logged in successfully");
  } catch (error) {
    console.error("Error in login controller:", error.message);
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

// Logout Controller
export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()), // Immediately expire the token
        httpOnly: true,
      })
      .json({
        success: true,
        message: "User logged out successfully.",
      });
  } catch (error) {
    console.error("Error in logout controller:", error.message);
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};


export const getMyProfile = (req,res,next)=>{
  const user = req.user;
  res.status(200).json({
    success: true,
    user,
  });
}
