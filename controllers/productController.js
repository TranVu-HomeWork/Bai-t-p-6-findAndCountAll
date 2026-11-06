const { Product, Category } = require('../models/associations');

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [{ model: Category, attributes: ['id', 'name'] }]
    });
    return res.status(200).json({
      success: true,
      data: products
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Đã xảy ra lỗi khi lấy danh sách sản phẩm.'
      }
    });
  }
};
// 2. GET /api/v1/products/:id (Lấy sản phẩm theo ID)
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Không tìm thấy sản phẩm với ID này.'
        }
      });
    }
    return res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Đã xảy ra lỗi khi truy vấn sản phẩm.'
      }
    });
  }
};

// 3. POST /api/v1/products (Tạo sản phẩm mới)
exports.createProduct = async (req, res) => {
  try {
    const { name, price, category_id } = req.body;
    const newProduct = await Product.create({ name, price, category_id });
    return res.status(201).json({
      success: true,
      data: newProduct
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'BAD_REQUEST',
        message: 'Dữ liệu đầu vào không hợp lệ hoặc thiếu thông tin.'
      }
    });
  }
};

// 4. PUT /api/v1/products/:id (Cập nhật sản phẩm)
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, category_id } = req.body;
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Không tìm thấy sản phẩm cần cập nhật.'
        }
      });
    }

    await product.update({ name, price, category_id });
    return res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error: {
        code: 'BAD_REQUEST',
        message: 'Không thể cập nhật sản phẩm.'
      }
    });
  }
};

// 5. DELETE /api/v1/products/:id (Xóa sản phẩm)
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Không tìm thấy sản phẩm cần xóa.'
        }
      });
    }

    await product.destroy();
    // Yêu cầu bắt buộc: Trả về status 204 và KHÔNG kèm theo body
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Không thể xóa sản phẩm.'
      }
    });
  }
};