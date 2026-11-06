'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    // 1. Nạp 3 Categories
    await queryInterface.bulkInsert('categories', [
      { id: 1, name: 'Công nghệ', created_at: new Date(), updated_at: new Date() },
      { id: 2, name: 'Văn học', created_at: new Date(), updated_at: new Date() },
      { id: 3, name: 'Kinh tế', created_at: new Date(), updated_at: new Date() }
    ], {});

    // 2. Nạp 6 Products liên kết với các category_id tương ứng
    await queryInterface.bulkInsert('products', [
      { name: 'Laptop Gaming', price: 25000000, category_id: 1, created_at: new Date(), updated_at: new Date() },
      { name: 'Bàn phím cơ', price: 1500000, category_id: 1, created_at: new Date(), updated_at: new Date() },
      { name: 'Nhà Giả Kim', price: 89000, category_id: 2, created_at: new Date(), updated_at: new Date() },
      { name: 'Đắc Nhân Tâm', price: 95000, category_id: 2, created_at: new Date(), updated_at: new Date() },
      { name: 'Nhà Kinh Tế Vi Mô', price: 120000, category_id: 3, created_at: new Date(), updated_at: new Date() },
      { name: 'Tư Duy Nhanh Và Chậm', price: 180000, category_id: 3, created_at: new Date(), updated_at: new Date() }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    // Xóa dữ liệu ngược lại khi undo seed
    await queryInterface.bulkDelete('products', null, {});
    await queryInterface.bulkDelete('categories', null, {});
  }
};