const sequelize = require('../config/database');
const Product = require('./product')(sequelize);
const Category = require('./category')(sequelize);

Category.hasMany(Product, {
  foreignKey: 'category_id',
  as: 'products'
});

Product.belongsTo(Category, {
  foreignKey: 'category_id',
  as: 'category'
});

module.exports = { sequelize, Product, Category };