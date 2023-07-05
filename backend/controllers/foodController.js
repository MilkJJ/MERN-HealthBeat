const mongoose = require('mongoose');
const Food = require('../models/foodModel');

const getAllFoods = () => {
  return Food.find({});
};

const closeDatabaseConnection = () => {
  mongoose.connection.close();
};

module.exports = {
  getAllFoods,
  closeDatabaseConnection,
};
