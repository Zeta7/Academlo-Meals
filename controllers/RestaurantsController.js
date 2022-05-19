const { Restaurant } = require('../models/restaurantModel');
const { catchAsync } = require('../utils/CatchAsync');

//----------------- get all restaurants --------------------------
const getAllRestaurants = catchAsync(async (req, res, next) => {
    const restaurants = Restaurant.findAll({ where: { status: 'active' } });
    res.status(200).json({ restaurants });
});

//----------------- create restaurants --------------------------
const createRestaurant = catchAsync(async (req, res, next) => {
    const { name, address, rating } = req.body;

    const newRestaurant = await Restaurant.create({
        name,
        address,
        rating,
    });

    response.status(201).json({ newRestaurant });
});

//------------------- get restaurant id -------------------------
const getRestaurantById = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
    res.status(200).json(restaurant);
});

//------------------- update restaurant -------------------------
const updateRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
    const { name, address } = req.body;
    await restaurant.update({ name, address });
    res.status(200).json({ status: 'succes' });
});

//------------------ delete restaurant -------------------------
const deleteRestaurant = catchAsync(async (req, res, next) => {
    const { restaurant } = req;
    await restaurant.update({ status: 'deleted' });
    res.status(200).json({ status: 'succes' });
});

module.exports = {
    getAllRestaurants,
    createRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
    deleteRestaurant,
};
