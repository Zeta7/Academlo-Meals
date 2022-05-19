const { Review } = require('../models/reviewModel');
const { catchAsync } = require('../utils/CatchAsync');
const { AppError } = require('../utils/AppError');

const reviewExists = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;

    const review = await Review.findOne({
        where: { userId: sessionUser, status: 'active' },
    });
    if (!review) {
        return next(new AppError('Review not found given.', 404));
    }
    req.review = review;
    next();
});

module.exports = { reviewExists };
