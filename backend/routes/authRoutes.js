const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const nodemailer = require("nodemailer");

const router = express.Router();


// REGISTER
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  const existing = await User.findOne({ email });
  if (existing) {
    return res.json({ message: "User already exists" });
  }

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashed,
  });

  res.json({ message: "Registered successfully" });
});


// LOGIN
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "User not found" });
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    return res.json({ message: "Wrong password" });
  }

  const token = jwt.sign(
    { id: user._id },
    "secretkey"
  );

  res.json({ 
      token,
      name: user.name,
      email: user.email,
   });
});


// FORGOT PASSWORD
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ message: "User not found" });
  }

  const token = crypto.randomBytes(32).toString("hex");

  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000;

  await user.save();

  console.log("EMAIL_USER:", process.env.EMAIL_USER);
console.log("EMAIL_PASS:", process.env.EMAIL_PASS);

  const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const resetLink =
  `http://localhost:3000/reset/${token}`;
try {
  console.log("Sending to:", email);
  await transporter.sendMail({ 
    from: process.env.EMAIL_USER,
    to: email,
    subject: "Expense Tracker - Password Reset Link",
     html: `
  <h2>Expense Tracker</h2>
  <p>Click below to reset your password:</p>
  <a href="${resetLink}">Reset Password</a>
`,
 
    
  });

  console.log("Email sent successfully");

  res.json({
    message: "Reset email sent",
  });

} catch (error) {
  console.log(error);

  res.json({
    message: "Email failed",
  });
}

});

// RESET PASSWORD
router.post("/reset-password/:token", async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return res.json({
      message: "Token invalid or expired",
    });
  }

  const hashed = await bcrypt.hash(password, 10);

  user.password = hashed;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  await user.save();

  res.json({
    message: "Password reset successful",
  });
});

module.exports = router;