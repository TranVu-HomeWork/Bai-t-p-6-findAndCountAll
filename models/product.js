const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Product = sequelize.define('Product', {
    name: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    category_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'products',
    underscored: true, // Giúp tự động map với các trường snake_case như category_id
    timestamps: true
  });

  return Product;
};