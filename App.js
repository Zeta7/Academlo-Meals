const express = require('express');
const { usersRoutes } = require('./routes/UsersRoutes');
const { restaurantRoutes } = require('./routes/RestaurantRoutes');
const cors = require('cors');

const App = express();
App.use(cors());

App.use(express.json());

App.use('/api/v1/users', usersRoutes);
App.use('/api/v1/restaurants', restaurantRoutes);

module.exports = { App };
