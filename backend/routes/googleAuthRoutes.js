const express = require("express");
const passport = require("passport");
require("../config/googleAuth.js");

const router = express.Router();

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Google OAuth login (redirects to Google)
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to Google login
 */
router.get("/", passport.authenticate("google", { scope: ["profile", "email"] }));

/**
 * @swagger
 * /auth/google/callback:
 *   get:
 *     summary: Google OAuth callback
 *     tags: [Auth]
 *     responses:
 *       302:
 *         description: Redirects to frontend after login
 */
router.get(
  "/callback",
  passport.authenticate("google", { failureRedirect: "http://localhost:3000/login" }),
  (req, res) => {
    res.redirect("http://localhost:3000/dashboard");
  }
);

module.exports = router;
