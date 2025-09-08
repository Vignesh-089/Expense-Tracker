const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User & Admin Authentication
 */

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Register a new user or admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *                 enum: [user, admin]
 *     responses:
 *       200:
 *         description: User registered successfully
 */
router.post("/register", async (req, res) => {
    const { name, email, password, role } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        res.json({ message: "User registered", user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

/**
 * @swagger
 * /api/auth/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: List of users
 */
router.get("/users", async (req, res) => {
    try {
        const users = await User.find().select("-password"); // hide password field
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

/**
 * @swagger
 * /api/auth/profile:
 *   get:
 *     summary: Get current logged-in user profile
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: User profile
 */
router.get("/profile", async (req, res) => {
    try {
        // In a real app, you'd extract userId from JWT token
        const { id } = req.query; // ⚠️ temporary: get from query for testing
        const user = await User.findById(id).select("-password");
        if (!user) return res.status(404).json({ error: "User not found" });

        res.json(user);
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login with email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ error: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });

        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET || "SECRET_KEY",
            { expiresIn: "1h" }
        );
        res.json({ token, user });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

module.exports = router;
