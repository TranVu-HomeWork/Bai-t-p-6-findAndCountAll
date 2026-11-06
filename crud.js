const sequelize = require('./config/database');
const Book = require('./models/book')(sequelize);

async function runCRUD() {
  try {
    // Kết nối và đồng bộ bảng
    await sequelize.authenticate();
    await sequelize.sync(); // Có thể dùng { force: true } nếu muốn làm sạch bảng mỗi lần chạy thử

    console.log('\n========================================');
    console.log('1. TẠO 3 BẢN GHI TRONG MỘT LẦN GỌI');
    console.log('========================================');
    const createdBooks = await Book.bulkCreate([
      { title: 'Node.js Cơ bản', author: 'Nguyễn Văn A', price: 150000 },
      { title: 'JavaScript Nâng cao', author: 'Trần Văn B', price: 200000 },
      { title: 'Full-stack Web Development', author: 'Lê Thị C', price: 300000 }
    ]);
    console.log('👉 Kết quả tạo:', createdBooks.map(b => b.toJSON()));

    console.log('\n========================================');
    console.log('2. LẤY TOÀN BỘ DANH SÁCH VÀ SỐ LƯỢNG');
    console.log('========================================');
    const allBooks = await Book.findAll();
    console.log(`👉 Tổng số lượng bản ghi: ${allBooks.length}`);
    console.log('👉 Danh sách sách:', allBooks.map(b => b.toJSON()));

    // Lấy id của bản ghi đầu tiên làm khóa chính mẫu cho các bước sau
    const targetId = allBooks[0].id;

    console.log('\n========================================');
    console.log(`3. LẤY MỘT BẢN GHI THEO KHÓA CHÍNH (id = ${targetId})`);
    console.log('========================================');
    const bookById = await Book.findByPk(targetId);
    console.log('👉 Bản ghi tìm được:', bookById ? bookById.toJSON() : 'Không tìm thấy');

    console.log('\n========================================');
    console.log(`4. CẬP NHẬT GIÁ CỦA BẢN GHI (id = ${targetId})`);
    console.log('========================================');
    const newPrice = 185000;
    await Book.update({ price: newPrice }, { where: { id: targetId } });
    const updatedBook = await Book.findByPk(targetId);
    console.log('👉 Bản ghi sau khi cập nhật giá:', updatedBook ? updatedBook.toJSON() : 'Không tìm thấy');

    console.log('\n========================================');
    console.log(`5. XÓA BẢN GHI VÀ TRUY VẤN LẠI (id = ${targetId})`);
    console.log('========================================');
    await Book.destroy({ where: { id: targetId } });
    console.log(`👉 Đã thực hiện xóa bản ghi có id = ${targetId}`);

    const checkDeleted = await Book.findByPk(targetId);
    console.log('👉 Kết quả truy vấn lại bản ghi đã xóa:', checkDeleted ? checkDeleted.toJSON() : 'null (Đã xóa thành công)');

  } catch (error) {
    console.error('❌ Lỗi khi thực thi CRUD:', error);
  } finally {
    await sequelize.close();
  }
}

runCRUD();