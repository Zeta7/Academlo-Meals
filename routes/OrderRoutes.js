const express = require('express');
const router = express.Router();

const {
    createOrder,
    deleteOrder,
    getAllOrdersUsers,
    updateOrder,
} = require('../controllers/OrdersController');

const { protectToken } = require('../middlewares/UserMiddlewares');
const { orderExists } = require('../middlewares/OrderMiddlewares');

router.use(protectToken);
router.get('./me', getAllOrdersUsers);

router
    .route('/:id')
    .patch(orderExists, updateOrder)
    .delete(orderExists, deleteOrder);

module.exports = { orderRoutes: router };
