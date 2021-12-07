const { Router } = require('express');
const router = Router()

//services
const userService = require('../services/user-service');

const userRepository = require('../repositories/customer-repository');

router.post("/login", async (req, res) => {
  try {
    return await userService.login(req, res);
  } catch(error) {
    console.error(error.message);
    res.send('502, failed to create user!');
  }
})

router.post("/register/restaurant", async (req, res) => {
  try {
    const registeredRestaurant = await userService.registerRestaurant(req, res);
    return registeredRestaurant;
  } catch(error) {
    res.status(502).json({ message: '502, failed to create restaurant!' });
  }
})

router.post("/register/customer", async (req, res) => {
  try {
    const createdRestaurant = await userService.registerRestaurant(req);
    res.json(createdRestaurant);
  } catch(error) {
    console.log(error);
    res.status(502).json({ message: '502, failed to create user!' });
  }
})

// router.get("/login", (req, res) => {
//   res.send("login")
// })

module.exports = router;
