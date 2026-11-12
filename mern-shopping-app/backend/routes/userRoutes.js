import express from "express";
import User from "../models/User.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { username, emailId, age, password } = req.body;
    if (!username || !emailId || age === undefined || age === null || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide username, email ID, age, and password."
      });
    }

    const trimmedEmail = emailId.trim().toLowerCase();

    const existingUser = await User.findOne({ emailId: trimmedEmail });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Email ID is already registered. Please login instead."
      });
    }

    const newUser = new User({
      username: username.trim(),
      emailId: trimmedEmail,
      age: Number(age),
      password: password
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      success: true,
      message: `Successfully registered! Welcome, ${savedUser.username}.`,
      data: {
        username: savedUser.username,
        emailId: savedUser.emailId,
        age: savedUser.age
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message: "Email ID is already registered."
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || "Error registering user."
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const emailId = req.query.emailId;

    if (!emailId) {
      const users = await User.find().select("-password");
      return res.status(200).json({
        success: true,
        data: users
      });
    }

    const user = await User.findOne({ emailId: emailId.trim().toLowerCase() }).select("-password");
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    return res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.put("/", async (req, res) => {
  try {
    const emailId = req.query.emailId;

    if (!emailId) {
      return res.status(400).json({
        success: false,
        message: "emailId query parameter is required."
      });
    }

    const { username, age, password } = req.body;

    if (!username || age === undefined || age === null || !password) {
      return res.status(400).json({
        success: false,
        message: "PUT requires complete editable details: username, age, and password."
      });
    }

    const user = await User.findOne({ emailId: emailId.trim().toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    user.username = username.trim();
    user.age = Number(age);
    user.password = password;

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Complete profile updated successfully.",
      data: {
        username: updatedUser.username,
        emailId: updatedUser.emailId,
        age: updatedUser.age
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.patch("/", async (req, res) => {
  try {
    const emailId = req.query.emailId;

    if (!emailId) {
      return res.status(400).json({
        success: false,
        message: "emailId query parameter is required."
      });
    }

    const user = await User.findOne({ emailId: emailId.trim().toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    if (req.body.username !== undefined) {
      user.username = req.body.username.trim();
    }
    if (req.body.age !== undefined) {
      user.age = Number(req.body.age);
    }
    if (req.body.password !== undefined && req.body.password.trim() !== "") {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    return res.status(200).json({
      success: true,
      message: "Selected profile fields updated successfully.",
      data: {
        username: updatedUser.username,
        emailId: updatedUser.emailId,
        age: updatedUser.age
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

router.delete("/", async (req, res) => {
  try {
    const emailId = req.query.emailId;

    if (!emailId) {
      return res.status(400).json({
        success: false,
        message: "emailId query parameter is required."
      });
    }

    const deletedUser = await User.findOneAndDelete({
      emailId: emailId.trim().toLowerCase()
    });

    if (!deletedUser) {
      return res.status(404).json({
        success: false,
        message: "User not found."
      });
    }

    return res.status(200).json({
      success: true,
      message: `User record for ${deletedUser.username} (${deletedUser.emailId}) deleted successfully.`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export const loginHandler = async (req, res) => {
  try {
    const { emailId, password } = req.body;

    if (!emailId || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide both email ID and password."
      });
    }

    const user = await User.findOne({ emailId: emailId.trim().toLowerCase() });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User Not Registered."
      });
    }

    if (user.password !== password) {
      return res.status(401).json({
        success: false,
        message: "Invalid Password."
      });
    }

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        username: user.username,
        emailId: user.emailId,
        age: user.age
      },
      token: `auth_${Buffer.from(user.emailId).toString("base64")}`
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export default router;

