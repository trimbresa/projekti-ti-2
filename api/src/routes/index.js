const authRoutes = require('./auth-routes');
const userRoutes = require('./user-routes');
const mainRoutes = require('./main-routes');
const restaurantRoutes = require('./restaurant-routes');
const menuRoutes = require('./menu-routes');

module.exports = [authRoutes, userRoutes, restaurantRoutes, menuRoutes]
