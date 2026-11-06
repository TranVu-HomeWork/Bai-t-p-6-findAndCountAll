## Bài 5: Association One-to-Many và Eager Loading với include

### Câu lệnh SQL có JOIN do Sequelize sinh ra khi gọi `GET /api/v1/products`:
```sql
Executing (default): SELECT `Product`.`id`, `Product`.`name`, `Product`.`price`, `Product`.`category_id`, `Product`.`created_at` AS `createdAt`, `Product`.`updated_at` AS `updatedAt`, `Category`.`id` AS `Category.id`, `Category`.`name` AS `Category.name` FROM `products` AS `Product` LEFT OUTER JOIN `categories` AS `Category` ON `Product`.`category_id` = `Category`.`id`;