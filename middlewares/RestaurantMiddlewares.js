const { Restaurant } = require('../models/restaurantModel');
const { catchAsync } = require('../utils/CatchAsync');
const { AppError } = require('../utils/AppError');

const restaurantExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const restaurant = await Restaurant.findOne({
        where: { id, status: 'active' },
    });
    if (!restaurant) {
        return next(new AppError('restaurant not found given that id.', 404));
    }
    request.restaurant = restaurant;
    next();
});

module.exports = { restaurantExists };
