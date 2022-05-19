const { Order } = require('../models/orderModel');
const { AppError } = require('../utils/appError');
const { catchAsync } = require('../utils/catchAsync');

const orderExists = catchAsync(async (req, res, next) => {
    const { id } = req.params;

    const order = await Order.findOne({ where: { id } });
    if (!order) {
        return next(new AppError('Order not found given that id.', 404));
    }
    req.order = order;
    next();
});

module.exports = { orderExists };
