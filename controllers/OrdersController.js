const { Order } = require('../models/orderModel');
const { Meal } = require('../models/mealModel');
const { catchAsync } = require('../utils/catchAsync');
const { AppError } = require('../utils/appError');

//----------------- get all order user ----------------------------
const getAllOrdersUsers = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;
    const orders = await Order.findAll({ where: { userId: sessionUser.id } });
    res.status(200).json({ orders });
});

//----------------- create new order -------------------------------
const createOrder = catchAsync(async (req, res, next) => {
    const { quantity, mealId } = req.body;
    const meal = await Meal.findOne({ where: { id: mealId } });

    if (!meal) {
        return next(new AppError('the food does not exist', 404));
    }

    const TotalPrice = meal.price * quantity;

    const newOrder = await Order.create({
        quantity,
        mealId,
        price: TotalPrice,
    });

    res.status(201).json({ newOrder });
});

//------------------- update order -----------------------------
const updateOrder = catchAsync(async (req, res, next) => {
    const { order } = req;
    await order.update({ status: 'completed' });
    res.status(201).json({ status: 'succes' });
});

//------------------ delete order ------------------------------
const deleteOrder = catchAsync(async (req, res, next) => {
    const { order } = req;
    await order.update({ status: 'cancelled' });
    res.status(201).json({ status: 'succes' });
});

module.exports = { getAllOrdersUsers, createOrder, updateOrder, deleteOrder };
