const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  const Book = sequelize.define('Book', {
    title: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    price: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    tableName: 'books',
    underscored: true, // Giúp tự động chuyển đổi các field sang snake_case (ví dụ: createdAt thành created_at)
    timestamps: true
  });

  return Book;
};