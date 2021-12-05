const { Router } = require('express');
const router = Router()

const userRepository = require('../repositories/user-repository');

router.get("/", async (req, res) => {
  try {
    const userRepo = await userRepository.createUser();
    console.log(userRepo);
    res.send("created user")
  } catch(error) {
    console.error(error.message);
    res.send('502, failed to create user!');
  }
})

router.get("/update", async (req, res) => {
  try {
    const userRepo = await userRepository.updateUser();
    // console.log(userRepo);
    res.send("found user")
  } catch(error) {
    console.log(error);
    res.send('502, failed to create user!');
  }
})

// router.get("/login", (req, res) => {
//   res.send("login")
// })

module.exports = router;
