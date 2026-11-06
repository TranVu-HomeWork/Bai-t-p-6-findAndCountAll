const express = require('express');
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

const app = express();

// Middleware đọc JSON từ request body
app.use(express.json());
// Gắn route sản phẩm theo đúng tiền tố chuẩn
app.use('/api/v1/products', productRoutes);
app.use('/api/v1/categories', categoryRoutes);

// Xử lý lỗi tập trung tổng quát (tránh lộ thông tin cơ sở dữ liệu)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({
    success: false,
    error: {
      code: 'SERVER_ERROR',
      message: 'Lỗi hệ thống nội bộ.'
    }
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server đang chạy tại cổng ${PORT}`);
});