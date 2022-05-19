const { App } = require('./App');
const { dataBase } = require('./utils/DataBase');

const { User } = require('./models/userModel');
const { Review } = require('./models/reviewModel');
const { Restaurant } = require('./models/restaurantModel');
const { Order } = require('./models/orderModel');
const { Meal } = require('./models/mealModel');

//----------------------------------------------------------------------------------------//
dataBase
    .authenticate()
    .then(console.log('successful connection'))
    .catch((error) => console.log(error));

//--------------- relaciones -------------------------------------------------------------//
User.hasMany(Review, { foreignKey: 'userId' });
Review.belongsTo(User);

User.hasOne(Order, { foreignKey: 'userId' });
Order.belongsTo(User);

Meal.hasOne(Order, { foreignKey: 'mealId' });
Order.belongsTo(Meal);

Restaurant.hasMany(Review, { foreignKey: 'restaurantId' });
Review.belongsTo(Restaurant);

Restaurant.hasMany(Meal, { foreignKey: 'restaurantId' });
Meal.belongsTo(Restaurant);
//---------------------------------------------------------------------------------------//

dataBase
    .sync()
    .then(console.log('successful Sync'))
    .catch((error) => console.log(error));

//---------------------------------------------------------------------------------------//
const PORT = process.env.PORT || 4000;

App.listen(PORT, () => {
    console.log('the server started successfully');
});
