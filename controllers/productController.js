const { Product, Category } = require('../models/associations');
const { Op } = require('sequelize');

// 1. GET /api/v1/products (Lấy danh sách sản phẩm với phân trang và lọc)
exports.getAllProducts = async (req, res) => {
  try { const { page: pageQuery, limit: limitQuery, keyword, sort } = req.query;
    const page = pageQuery === undefined ? 1 : Number(pageQuery);
    const limit = limitQuery === undefined ? 10 : Number(limitQuery);

    if (!Number.isInteger(page) || page <= 0) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_PAGE',
          message: 'page phải là số nguyên lớn hơn 0.'
        }
      });
    }

    if (!Number.isInteger(limit) || limit <= 0 || limit > 50) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_LIMIT',
          message: 'limit phải là số nguyên từ 1 đến 50.'
        }
      });
    }

    const where = {};

    if (keyword && keyword.trim()) {
      where.name = {
        [Op.like]: `%${keyword.trim()}%`
      };
    }

    let order = [['id', 'DESC']];

    if (sort === 'price_asc') {
      order = [['price', 'ASC']];
    } else if (sort === 'price_desc') {
      order = [['price', 'DESC']];
    } else if (sort !== undefined) {
      return res.status(400).json({
        success: false,
        error: {
          code: 'INVALID_SORT',
          message: 'sort chỉ nhận price_asc hoặc price_desc.'
        }
      });
    }

    const offset = (page - 1) * limit;

    const { count, rows } = await Product.findAndCountAll({
      where,
      limit,
      offset,
      order,
      distinct: true,
      include: [{
        model: Category,
        attributes: ['id', 'name']
      }]
    });

    return res.status(200).json({
      success: true,
      data: rows,
      meta: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit)
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Không thể lấy danh sách sản phẩm.'
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