const authRoutes = require('./auth-routes');
const userRoutes = require('./user-routes');
const restaurantRoutes = require('./restaurant-routes');
const menuRoutes = require('./menu-routes');
const orderRoutes = require('./order-routes');

module.exports = [authRoutes, userRoutes, restaurantRoutes, menuRoutes, orderRoutes]
