const { Category, Product } = require('../models/associations');

exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findByPk(req.params.id, {
      include: [{
        model: Product,
        attributes: ['id', 'name', 'price', 'category_id']
      }]
    });

    if (!category) {
      return res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Không tìm thấy danh mục với ID này.'
        }
      });
    }

    return res.status(200).json({
      success: true,
      data: category
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Đã xảy ra lỗi khi truy vấn danh mục.'
      }
    });
  }
};