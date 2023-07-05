const express = require('express');
const { getAllFoods } = require('../controllers/foodController');

const router = express.Router();

// GET all foods
router.get('/api/foods', getAllFoods);

module.exports = router;