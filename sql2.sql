/*
 Navicat Premium Data Transfer

 Source Server         : 103.239.66.182
 Source Server Type    : MySQL
 Source Server Version : 100703 (10.7.3-MariaDB-log)
 Source Host           : 103.239.66.182:3306
 Source Schema         : swp391_g4

 Target Server Type    : MySQL
 Target Server Version : 100703 (10.7.3-MariaDB-log)
 File Encoding         : 65001

 Date: 17/09/2024 11:25:04
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for banks
-- ----------------------------
DROP TABLE IF EXISTS `banks`;
CREATE TABLE `banks`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `phone_number` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `interest_rate` decimal(5, 2) NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of banks
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for car_colors
-- ----------------------------
DROP TABLE IF EXISTS `car_colors`;
CREATE TABLE `car_colors`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `color_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of car_colors
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for car_images
-- ----------------------------
DROP TABLE IF EXISTS `car_images`;
CREATE TABLE `car_images`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `car_id` int NULL DEFAULT NULL,
  `image_url` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `car_id`(`car_id` ASC) USING BTREE,
  CONSTRAINT `car_images_ibfk_1` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of car_images
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for car_options
-- ----------------------------
DROP TABLE IF EXISTS `car_options`;
CREATE TABLE `car_options`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_detail_id` int NOT NULL,
  `option_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  `price` decimal(15, 2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `order_detail_id`(`order_detail_id` ASC) USING BTREE,
  CONSTRAINT `car_options_ibfk_1` FOREIGN KEY (`order_detail_id`) REFERENCES `order_details` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of car_options
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for cars
-- ----------------------------
DROP TABLE IF EXISTS `cars`;
CREATE TABLE `cars`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `brand` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `model` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `price` decimal(15, 2) NOT NULL,
  `description` longtext CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  `stock` int NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of cars
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for customers
-- ----------------------------
DROP TABLE IF EXISTS `customers`;
CREATE TABLE `customers`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `email` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `phone_number` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `date_of_birth` date NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of customers
-- ----------------------------
BEGIN;
INSERT INTO `customers` (`id`, `fullname`, `password`, `email`, `created_at`, `updated_at`, `phone_number`, `address`, `date_of_birth`) VALUES (1, 'Tran Duc', '123456', 'duc@gmail.com', '2024-09-13 16:10:32', '2024-09-17 10:41:14', '0987654321', 'hanoi', '2004-10-12'), (3, 'customer123', '$2b$10$70oxSwC5Z1skQ3qrMgPeJeizNDsXaIPwDrFPBkNIJHl17Sm2d5c8O', 'customer123@gmail.com', '2024-09-17 10:39:33', '2024-09-17 10:39:33', '0987654321', 'Nam Dinh', '2000-10-09');
COMMIT;

-- ----------------------------
-- Table structure for insurance_contracts
-- ----------------------------
DROP TABLE IF EXISTS `insurance_contracts`;
CREATE TABLE `insurance_contracts`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `car_id` int NULL DEFAULT NULL,
  `provider_id` int NULL DEFAULT NULL,
  `contract_number` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `total_amount` decimal(15, 2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `insurance_type_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `car_id`(`car_id` ASC) USING BTREE,
  INDEX `provider_id`(`provider_id` ASC) USING BTREE,
  INDEX `insurance_type_id`(`insurance_type_id` ASC) USING BTREE,
  CONSTRAINT `insurance_contracts_ibfk_1` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `insurance_contracts_ibfk_2` FOREIGN KEY (`provider_id`) REFERENCES `insurance_providers` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `insurance_contracts_ibfk_3` FOREIGN KEY (`insurance_type_id`) REFERENCES `insurance_types` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of insurance_contracts
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for insurance_histories
-- ----------------------------
DROP TABLE IF EXISTS `insurance_histories`;
CREATE TABLE `insurance_histories`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NULL DEFAULT NULL,
  `order_id` int NULL DEFAULT NULL,
  `insurance_contract_id` int NULL DEFAULT NULL,
  `purchase_date` date NOT NULL,
  `total_amount` decimal(15, 2) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`customer_id` ASC) USING BTREE,
  INDEX `order_id`(`order_id` ASC) USING BTREE,
  INDEX `insurance_contract_id`(`insurance_contract_id` ASC) USING BTREE,
  CONSTRAINT `insurance_histories_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `insurance_histories_ibfk_2` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `insurance_histories_ibfk_3` FOREIGN KEY (`insurance_contract_id`) REFERENCES `insurance_contracts` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of insurance_histories
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for insurance_providers
-- ----------------------------
DROP TABLE IF EXISTS `insurance_providers`;
CREATE TABLE `insurance_providers`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `phone_number` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of insurance_providers
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for insurance_types
-- ----------------------------
DROP TABLE IF EXISTS `insurance_types`;
CREATE TABLE `insurance_types`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `type_name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of insurance_types
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for loans
-- ----------------------------
DROP TABLE IF EXISTS `loans`;
CREATE TABLE `loans`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `loan_amount` decimal(15, 2) NOT NULL,
  `duration_months` int NOT NULL,
  `customer_id` int NULL DEFAULT NULL,
  `bank_id` int NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`customer_id` ASC) USING BTREE,
  INDEX `bank_id`(`bank_id` ASC) USING BTREE,
  CONSTRAINT `loans_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `loans_ibfk_2` FOREIGN KEY (`bank_id`) REFERENCES `banks` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of loans
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for news
-- ----------------------------
DROP TABLE IF EXISTS `news`;
CREATE TABLE `news`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `content` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `status` enum('draft','published','archived') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'draft',
  `sort` int NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `posted_by` int NULL DEFAULT NULL,
  `category_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `fk_author_staff`(`posted_by` ASC) USING BTREE,
  INDEX `fk_category_news`(`category_id` ASC) USING BTREE,
  CONSTRAINT `fk_author_staff` FOREIGN KEY (`posted_by`) REFERENCES `staffs` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_category_news` FOREIGN KEY (`category_id`) REFERENCES `news_categories` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of news
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for news_categories
-- ----------------------------
DROP TABLE IF EXISTS `news_categories`;
CREATE TABLE `news_categories`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of news_categories
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for order_details
-- ----------------------------
DROP TABLE IF EXISTS `order_details`;
CREATE TABLE `order_details`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NULL DEFAULT NULL,
  `car_id` int NULL DEFAULT NULL,
  `price` decimal(15, 2) NOT NULL,
  `insurance_contract_id` int NULL DEFAULT NULL,
  `color_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `order_id`(`order_id` ASC) USING BTREE,
  INDEX `car_id`(`car_id` ASC) USING BTREE,
  INDEX `insurance_contract_id`(`insurance_contract_id` ASC) USING BTREE,
  INDEX `color_id`(`color_id` ASC) USING BTREE,
  CONSTRAINT `order_details_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `order_details_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `order_details_ibfk_3` FOREIGN KEY (`insurance_contract_id`) REFERENCES `insurance_contracts` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `order_details_ibfk_4` FOREIGN KEY (`color_id`) REFERENCES `car_colors` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of order_details
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for order_payment_histories
-- ----------------------------
DROP TABLE IF EXISTS `order_payment_histories`;
CREATE TABLE `order_payment_histories`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` int NOT NULL,
  `amount` decimal(10, 2) NOT NULL,
  `payment_date` timestamp NOT NULL DEFAULT current_timestamp,
  `payment_method` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `status` enum('pending','completed','failed') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `order_id`(`order_id` ASC) USING BTREE,
  CONSTRAINT `order_payment_histories_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of order_payment_histories
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for orders
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NULL DEFAULT NULL,
  `car_id` int NULL DEFAULT NULL,
  `payment_price` decimal(10, 2) NULL DEFAULT NULL,
  `total_price` decimal(15, 2) NOT NULL,
  `sales_staff_id` int NULL DEFAULT NULL,
  `technical_staff_id` int NULL DEFAULT NULL,
  `insurance_staff_id` int NULL DEFAULT NULL,
  `order_status` enum('pending','completed','cancelled') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `showroom_id` int NOT NULL,
  `loan_id` int NULL DEFAULT NULL,
  `discount_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`customer_id` ASC) USING BTREE,
  INDEX `car_id`(`car_id` ASC) USING BTREE,
  INDEX `sales_staff_id`(`sales_staff_id` ASC) USING BTREE,
  INDEX `technical_staff_id`(`technical_staff_id` ASC) USING BTREE,
  INDEX `insurance_staff_id`(`insurance_staff_id` ASC) USING BTREE,
  INDEX `showroom_id`(`showroom_id` ASC) USING BTREE,
  INDEX `loan_id`(`loan_id` ASC) USING BTREE,
  INDEX `discount_id`(`discount_id` ASC) USING BTREE,
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`sales_staff_id`) REFERENCES `staffs` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`technical_staff_id`) REFERENCES `staffs` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_5` FOREIGN KEY (`insurance_staff_id`) REFERENCES `staffs` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_6` FOREIGN KEY (`showroom_id`) REFERENCES `showroom` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_7` FOREIGN KEY (`loan_id`) REFERENCES `loans` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `orders_ibfk_8` FOREIGN KEY (`discount_id`) REFERENCES `vouchers` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of orders
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for showroom
-- ----------------------------
DROP TABLE IF EXISTS `showroom`;
CREATE TABLE `showroom`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `phone_number` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of showroom
-- ----------------------------
BEGIN;
INSERT INTO `showroom` (`id`, `name`, `address`, `phone_number`, `email`, `created_at`, `updated_at`) VALUES (1, '1S', '94-96 Phạm Đình Hổ, P2, Q6, HCM', '0987654321', 'hyundai@gmail.com', '2024-09-13 18:34:18', '2024-09-13 18:34:18');
COMMIT;

-- ----------------------------
-- Table structure for staff_roles
-- ----------------------------
DROP TABLE IF EXISTS `staff_roles`;
CREATE TABLE `staff_roles`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 5 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of staff_roles
-- ----------------------------
BEGIN;
INSERT INTO `staff_roles` (`id`, `name`) VALUES (1, 'Technical'), (2, 'Sale'), (3, 'Insurance'), (4, 'Director');
COMMIT;

-- ----------------------------
-- Table structure for staffs
-- ----------------------------
DROP TABLE IF EXISTS `staffs`;
CREATE TABLE `staffs`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `fullname` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `phone_number` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `email` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `role_id` int NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  `showroom_id` int NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `insurance_provider_id` int NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `role_id`(`role_id` ASC) USING BTREE,
  INDEX `showroom_id`(`showroom_id` ASC) USING BTREE,
  INDEX `fk_insurance_provider`(`insurance_provider_id` ASC) USING BTREE,
  CONSTRAINT `fk_insurance_provider` FOREIGN KEY (`insurance_provider_id`) REFERENCES `insurance_providers` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `staffs_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `staff_roles` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `staffs_ibfk_2` FOREIGN KEY (`showroom_id`) REFERENCES `showroom` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of staffs
-- ----------------------------
BEGIN;
INSERT INTO `staffs` (`id`, `fullname`, `password`, `phone_number`, `email`, `role_id`, `created_at`, `updated_at`, `showroom_id`, `address`, `insurance_provider_id`) VALUES (1, 'staff1', '123456', NULL, 'staff1@gmail.com', 1, '2024-09-13 18:34:26', '2024-09-13 18:34:32', 1, NULL, NULL), (3, 'admin', '$2a$12$5jOq90izPwFBN7KS/d0vZuo4AI8yBFH/irrCphxQkC2EDcUg7/5GO', NULL, 'admin@demo.com', 4, '2024-09-14 07:35:25', '2024-09-17 11:07:46', 1, NULL, NULL);
COMMIT;

-- ----------------------------
-- Table structure for test_drive_requests
-- ----------------------------
DROP TABLE IF EXISTS `test_drive_requests`;
CREATE TABLE `test_drive_requests`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `customer_id` int NULL DEFAULT NULL,
  `car_id` int NULL DEFAULT NULL,
  `test_drive_date` date NOT NULL,
  `sales_staff_id` int NULL DEFAULT NULL,
  `status` enum('pending','approved','completed') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `user_id`(`customer_id` ASC) USING BTREE,
  INDEX `car_id`(`car_id` ASC) USING BTREE,
  INDEX `sales_staff_id`(`sales_staff_id` ASC) USING BTREE,
  CONSTRAINT `test_drive_requests_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customers` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `test_drive_requests_ibfk_2` FOREIGN KEY (`car_id`) REFERENCES `cars` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `test_drive_requests_ibfk_3` FOREIGN KEY (`sales_staff_id`) REFERENCES `staffs` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of test_drive_requests
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for vouchers
-- ----------------------------
DROP TABLE IF EXISTS `vouchers`;
CREATE TABLE `vouchers`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `description` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL,
  `discount_type` enum('percentage','amount') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `discount_value` decimal(15, 2) NOT NULL,
  `type` enum('car','option') CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `start_date` date NOT NULL,
  `end_date` date NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci;

-- ----------------------------
-- Records of vouchers
-- ----------------------------
BEGIN;
COMMIT;

SET FOREIGN_KEY_CHECKS = 1;
