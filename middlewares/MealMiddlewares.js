const { Meal } = require('../models/mealModel');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');
const { Restaurant } = require('../models/restaurantModel');

const mealExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const meal = await Meal.findOne({
        include: [{ model: Restaurant }],
        where: { id, status: 'active' },
    });
    if (!meal) {
        return next(new AppError('Meal not found given that id.', 404));
    }
    req.meal = meal;
    next();
});

module.exports = { mealExists };
