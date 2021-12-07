const User = require('./User');
const Customer = require('./Customer');
const Address = require("./Address");
const Restaurant = require("./Restaurant");
const Menu = require("./Menu");
const MenuItems = require("./MenuItems");
const Item = require("./Item");

const allModels = [User, Customer, Address, Restaurant, Menu, MenuItems, Item]

module.exports = allModels;
