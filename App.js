const express = require('express');
const { usersRoutes } = require('./routes/UsersRoutes');
const { restaurantRoutes } = require('./routes/RestaurantRoutes');
const { mealRoutes } = require('./routes/MealRoutes');
const { orderRoutes } = require('./routes/OrderRoutes');
const { globalErrorHandler } = require('./controllers/ErrorController');
const cors = require('cors');

const App = express();
App.use(cors());

App.use(express.json());

App.use('/api/v1/users', usersRoutes);
App.use('/api/v1/restaurants', restaurantRoutes);
App.use('/api/v1/meals', mealRoutes);
App.use('/orders', orderRoutes);

App.use('*', globalErrorHandler);

module.exports = { App };
