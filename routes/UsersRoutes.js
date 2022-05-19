const Express = require('express');

const {
    checkValidations,
    createUserValidations,
} = require('../middlewares/ValidationsMiddlewares');

const {
    createUser,
    getAllUsers,
    loginUser,
    deleteUser,
    getOrdersUser,
    updateUser,
    getOrdersIdUser,
} = require('../controllers/UsersController');

const {
    protectAccountOwner,
    protectAdmin,
    protectToken,
    userExists,
} = require('../middlewares/UserMiddlewares');

const { orderExists } = require('../middlewares/OrderMiddlewares');

const router = Express.Router();

router.post('/signup', createUserValidations, checkValidations, createUser);
router.post('/login', loginUser);

router.use(protectToken);

router.get('/', protectAdmin, getAllUsers);
router
    .route('/:id')
    .patch(userExists, protectAccountOwner, updateUser)
    .delete(userExists, protectAccountOwner, deleteUser);
router.route('/orders').get(getOrdersUser);
router.route('./orders/:id').get(orderExists, getOrdersIdUser);

module.exports = { usersRoutes: router };
