const { Review } = require('../models/reviewModel');
const { catchAsync } = require('../utils/CatchAsync');

//----------------- create review --------------------------
const createReview = catchAsync(async (req, res, next) => {
    const { comment, rating } = req.body;

    const newReview = await Review.create({
        comment,
        rating,
    });

    res.status(201).json({ newReview });
});

//----------------- update review -------------------------
const updateReview = catchAsync(async (req, res, next) => {
    const { review } = req;
    const { comment, rating } = req.body;
    await review.update({ comment, rating });
    response.status(200).json({ status: 'succes' });
});

//----------------- delete review -------------------------
const deleteReview = catchAsync(async (req, res, next) => {
    const { review } = req;
    await review.update({ status: 'deleted' });
    response.status(200).json({ status: 'succes' });
});

module.exports = { createReview, updateReview, deleteReview };
