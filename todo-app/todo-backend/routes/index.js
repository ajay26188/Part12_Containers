const express = require('express');
const router = express.Router();

const configs = require('../util/config')
const redis = require('../redis')
const {todoCounter} = require('./todos');

let visits = 0

/* GET index data. */
router.get('/', async (req, res) => {
  visits++

  res.send({
    ...configs,
    visits
  });
});

router.get('/statistics', async(req,res) => {
  const statistics = {
    "added_todos": todoCounter.value
  }
  res.json(statistics);
});

module.exports = router;
