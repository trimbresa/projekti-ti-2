const { Router } = require('express');
const protectedRoute = require("../middlewares/protected-route");
const restaurantService = require("../services/restaurant-service");
const userService = require("../services/user-service");
const router = Router()

router.get("/user", (req, res) => {
  res.send("user")
})

router.get("/profile", protectedRoute, async (req, res) => {
  try {
    return await userService.getProfile(req, res);
  } catch (error) {
    res.status(502).json({ message: 'Server error' });
  }
})

router.patch("/profile", protectedRoute, async (req, res) => {
  try {
    return await userService.updateProfile(req, res);
  } catch (error) {
    res.status(502).json({ message: 'Server error' });
  }
})

module.exports = router;
