const express = require('express');
const router = express.Router();
const {
    createMeal,
    deleteMeal,
    getAllMeals,
    getMealById,
    updateMeal,
} = require('../controllers/MealsController');

const {
    protectAdmin,
    protectToken,
} = require('../middlewares/UserMiddlewares');

const { mealExists } = require('../middlewares/MealMiddlewares');

router.get('/', getAllMeals);
router.get('/:id', mealExists, getMealById);

router.use(protectToken, protectAdmin);
router
    .route('/:id')
    .post(createMeal)
    .patch(mealExists, updateMeal)
    .delete(mealExists, deleteMeal);

module.exports = { mealRoutes: router };
