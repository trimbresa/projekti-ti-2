const { Router } = require('express');
const router = Router()

router.get("/", (req, res) => {
  res.send("Welcome to eFood rest-api")
})

module.exports = router;
