# Eigen Backend Test Case - Library Management System

## Prerequisites

- Node.js (v16.x or higher)

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/kovalevshero/eigen-backend-test-case.git
   cd eigen-backend-test-case
   
2. **Install dependencies**
   ```bash
   npm install

3. **Set up environment variables**
   
    - Rename .env.example to .env

4. **Start the development server**
   ```bash
   npm run dev

## API Docs
For detailed API documentation, visit http://localhost:3000/api-docs after starting the development server

## Import MYSQL
Download it on release page or by inserting this code
```bash
/*
 Navicat Premium Data Transfer

 Source Server         : localhost_3306
 Source Server Type    : MySQL
 Source Server Version : 100432 (10.4.32-MariaDB)
 Source Host           : localhost:3306
 Source Schema         : eigen_test_case

 Target Server Type    : MySQL
 Target Server Version : 100432 (10.4.32-MariaDB)
 File Encoding         : 65001

 Date: 31/07/2024 22:41:09
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for books
-- ----------------------------
DROP TABLE IF EXISTS `books`;
CREATE TABLE `books`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `author` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `stock` int NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `books_code_index`(`code` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 6 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of books
-- ----------------------------
INSERT INTO `books` VALUES (1, 'JK-45', 'Harry Potter', 'J.K Rowling', 1, '2024-07-31 19:06:36', '2024-07-31 22:40:43');
INSERT INTO `books` VALUES (2, 'SHR-1', 'A Study in Scarlet', 'Arthur Conan Doyle', 1, '2024-07-31 19:06:58', '2024-07-31 22:40:44');
INSERT INTO `books` VALUES (3, 'TW-11', 'Twilight', 'Stephenie Meyer', 1, '2024-07-31 19:07:19', '2024-07-31 13:35:29');
INSERT INTO `books` VALUES (4, 'HOB-83', 'The Hobbit, or There and Back Again', 'J.R.R. Tolkien', 1, '2024-07-31 19:07:33', NULL);
INSERT INTO `books` VALUES (5, 'NRN-7', 'The Lion, the Witch and the Wardrobe', 'C.S. Lewis', 1, '2024-07-31 19:07:51', NULL);

-- ----------------------------
-- Table structure for borrowed_books
-- ----------------------------
DROP TABLE IF EXISTS `borrowed_books`;
CREATE TABLE `borrowed_books`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `books_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `members_code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  `deleted_at` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `borrowed_books_books_code_foreign`(`books_code` ASC) USING BTREE,
  INDEX `borrowed_books_members_code_foreign`(`members_code` ASC) USING BTREE,
  CONSTRAINT `borrowed_books_books_code_foreign` FOREIGN KEY (`books_code`) REFERENCES `books` (`code`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `borrowed_books_members_code_foreign` FOREIGN KEY (`members_code`) REFERENCES `members` (`code`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of borrowed_books
-- ----------------------------

-- ----------------------------
-- Table structure for members
-- ----------------------------
DROP TABLE IF EXISTS `members`;
CREATE TABLE `members`  (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NULL DEFAULT NULL,
  `borrow_count` int NOT NULL DEFAULT 0,
  `penalized_until` date NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp,
  `updated_at` datetime NULL DEFAULT NULL ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `members_code_index`(`code` ASC) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 4 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of members
-- ----------------------------
INSERT INTO `members` VALUES (1, 'M001', 'Angga', 0, NULL, '2024-07-31 19:08:10', '2024-07-31 22:40:49');
INSERT INTO `members` VALUES (2, 'M002', 'Ferry', 0, NULL, '2024-07-31 19:08:25', NULL);
INSERT INTO `members` VALUES (3, 'M003', 'Putri', 0, NULL, '2024-07-31 19:08:32', NULL);

SET FOREIGN_KEY_CHECKS = 1;

