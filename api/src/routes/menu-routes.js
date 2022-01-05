const { Router } = require('express');
const menuService = require('../services/menu-service');
// const protectedRoute = require("../middlewares/protected-route");
const router = Router()

router.get("/menu", async (req, res) => {
  try {
    return await menuService.fetchMenus(req, res);
  } catch (error) {
    res.status(502).json({ message: 'Server error' });
  }
})

router.get("/menus/:restaurant_id", async (req, res) => {
  try {
    return await menuService.fetchRestaurantMenus(req, res);
  } catch (error) {
    console.log('(MenuRoutes/menus/:restaurant_id) - get:', error.message);
    res.status(502).json({ message: 'Server error' });
  }
})

router.post("/menu", async (req, res) => {
  try {
    return await menuService.createMenu(req, res);
  } catch (error) {
    console.log('(MenuRoutes/menu) - Post:', error.message);
    res.status(502).json({ message: 'Server error' });
  }
})

router.post("/menu/items", async (req, res) => {
  try {
    return await menuService.createMenu(req, res);
  } catch (error) {
    console.log('(MenuRoutes/menu/items) - Post:', error.message);
    res.status(502).json({ message: 'Server error' });
  }
})

module.exports = router;
