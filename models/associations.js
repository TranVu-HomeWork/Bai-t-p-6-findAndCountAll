const sequelize = require('../config/database');
const Category = require('./category')(sequelize);
const Product = require('./product')(sequelize);

// Khai báo quan hệ 2 chiều theo đúng đề bài Bài 5
Category.hasMany(Product, { foreignKey: 'category_id' });
Product.belongsTo(Category, { foreignKey: 'category_id' });

module.exports = { sequelize, Category, Product };