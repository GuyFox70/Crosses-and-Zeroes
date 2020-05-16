const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('index', {
    cell: 9
  });
});
    
module.exports = router;