const express = require('express');
const addToFavoritesController = require('../controllers/addToFavoritesController');

const addToFavoritesRouter = express.Router();

addToFavoritesRouter.post('/add-to-favorites', addToFavoritesController);

module.exports = addToFavoritesRouter;
