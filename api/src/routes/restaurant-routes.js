const { Router } = require('express');
// const protectedRoute = require("../middlewares/protected-route");
const router = Router()
const restaurantService = require('../services/restaurant-service');

router.get("/restaurants", async (req, res) => {
    try {
        return await restaurantService.fetchRestaurants(req, res);
    } catch (error) {
        console.log(error.message)
        res.status(502).json({ message: 'Server error' });
    }
})

router.get("/restaurants/:id", async (req, res) => {
    try {
        return await restaurantService.getRestaurant(req, res);
    } catch (error) {
        console.log(error.message)
        res.status(502).json({ message: 'Server error' });
    }
})

module.exports = router;
