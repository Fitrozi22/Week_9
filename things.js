var express = require('express');
var router = express.Router();

// Data text
const text = "Hello, world!!in";
const text2 = "Helloo, World!! From Post"

// Route untuk menampilkan data text
router.get('/:name', (req, res) => {
  res.send(text + req.params.name);
});

router.post('/', (req, res) => {
    res.send(text2)
})

module.exports = router;