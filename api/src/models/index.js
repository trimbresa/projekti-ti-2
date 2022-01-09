const User = require('./User');
const Customer = require('./Customer');
const Address = require("./Address");
const Restaurant = require("./Restaurant");
const Menu = require("./Menu");
const MenuItems = require("./MenuItems");
const Item = require("./Item");
const Order = require("./Order");
const OrderItems = require("./OrderItems");

const allModels = [User, Customer, Address, Restaurant, Menu, MenuItems, Item, Order, OrderItems]

module.exports = allModels;
