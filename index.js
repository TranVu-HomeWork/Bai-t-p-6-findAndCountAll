require('dotenv').config();
const { Sequelize } = require('sequelize');

// Khởi tạo Sequelize instance sử dụng biến môi trường và port 3306 đã thống nhất
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false
  }
);

// Nạp Model Book vào sequelize
const Book = require('./models/book')(sequelize);

async function testConnectionAndSync() {
  try {
    // 1. Kiểm tra kết nối
    await sequelize.authenticate();
    console.log('✅ Kết nối tới database bookstore thành công!');

    // 2. Đồng bộ model với database (tự động tạo bảng books nếu chưa có)
    await sequelize.sync({ alter: true });
    console.log('✅ Đồng bộ bảng books thành công!');

  } catch (error) {
    console.error('❌ Không thể kết nối tới cơ sở dữ liệu:', error);
  } finally {
    // Đóng kết nối sau khi chạy xong script kiểm tra
    await sequelize.close();
  }
}

testConnectionAndSync();