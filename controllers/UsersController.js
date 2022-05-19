const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../models/userModel');
const { Order } = require('../models/orderModel');
const { catchAsync } = require('../utils/CatchAsync');
const { AppError } = require('../utils/AppError');

//-------------- get all users ----------------
const getAllUsers = catchAsync(async (req, res, next) => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    res.status(200).json({ users });
});

//-------------- create User ---------------
const createUser = catchAsync(async (req, res, next) => {
    const { name, email, password, role } = req.body;

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
        name,
        email,
        password: hashPassword,
        role: role || 'client',
    });

    newUser.password = undefined;

    res.status(201).json({ newUser });
});

//-------------- Login User -------------------------
const loginUser = catchAsync(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email, status: 'active' } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return next(new AppError('Invalid credentials', 400));
    }

    //generate token
    const token = await jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
    });

    user.password = undefined;
    res.status(200).json({ token, user });
});

//------------ update user ----------------------------
const updateUser = catchAsync(async (req, res, next) => {
    const { user } = req;
    const { name, email } = request.body;
    await user.update({ name, email });
    res.status(200).json({ status: 'succes' });
});

//------------- delete user --------------------------
const deleteUser = catchAsync(async (req, res, next) => {
    const { user } = req;
    await user.update({ status: 'deleted' });
    res.status(200).json({ status: 'succes' });
});

//------------- get orders user--------------------------------
const getOrdersUser = catchAsync(async (req, res, next) => {
    const { sessionUser } = req;
    const order = await Order.findAll({ where: { userId: sessionUser.id } });
    res.status(200).json({ order });
});

//------------- get order id user ---------------------------
const getOrdersIdUser = catchAsync(async (req, res, next) => {
    const { order } = req;
    res.status(200).json({ order });
});

module.exports = {
    createUser,
    getAllUsers,
    loginUser,
    updateUser,
    deleteUser,
    getOrdersUser,
    getOrdersIdUser,
};
