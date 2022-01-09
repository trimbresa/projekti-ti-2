const { Router } = require('express');
const protectedRoute = require("../middlewares/protected-route");
const orderService = require('../services/order-service');
const restaurantService = require("../services/restaurant-service");
const userService = require("../services/user-service");
const router = Router()

router.post("/order", protectedRoute, async (req, res) => {
  try {
    const createdOrder = await orderService.createOrder(req, res);
    return createdOrder;
  } catch(error) {
    console.log('(OrderRoutes.order - post) - Error:', error.message);
    res.status(502).json({ message: '502, failed to create order!' });
  }
})

router.get("/order", protectedRoute, async (req, res) => {
  try {
    return await orderService.fetchOrders(req, res);
  } catch (error) {
    console.log('(OrderRoutes.order - get) - Error: ', error.message);
    res.status(502).json({ message: 'Server error' });
  }
})

module.exports = router;
