const express = require('express');
const router = express.Router();

//----------------- restaurant controller --------------------
const {
    createRestaurant,
    deleteRestaurant,
    getAllRestaurants,
    getRestaurantById,
    updateRestaurant,
} = require('../controllers/RestaurantsController');

//------------------ review controller -------------------------
const {
    createReview,
    deleteReview,
    updateReview,
} = require('../controllers/ReviewsController');

//------------------ middlewares-------------------------------
const { restaurantExists } = require('../middlewares/RestaurantMiddlewares');
const { reviewExists } = require('../middlewares/ReviewMiddlewares');
const {
    protectToken,
    protectAccountOwner,
    protectAdmin,
} = require('../middlewares/UserMiddlewares');

router.route('/').get(getAllRestaurants);
router.route('/:id').get(restaurantExists, getRestaurantById);

router.use(protectToken);
router.route('/').post(createRestaurant);
router
    .route('/:id')
    .patch(restaurantExists, protectAdmin, updateRestaurant)
    .delete(restaurantExists, protectAdmin, deleteRestaurant);
router
    .route('/reviews/:id')
    .post(restaurantExists, createReview)
    .patch(restaurantExists, reviewExists, protectAccountOwner, updateReview)
    .delete(restaurantExists, reviewExists, protectAccountOwner, deleteReview);

module.exports = { restaurantRoutes: router };
