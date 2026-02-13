CREATE DATABASE IF NOT EXISTS hackathon_db
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE hackathon_db;

CREATE TABLE users (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY, 
    email VARCHAR(150) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,

    role ENUM ('USER',"ADMIN","MODERATOR") NOT NULL DEFAULT 'USER',

    is_verified BOOLEAN NOT NULL DEFAULT FALSE, 
    verify_token VARCHAR(36) DEFAULT NULL,
    reset_token VARCHAR(36) DEFAULT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    INDEX idx_email (email),
    INDEX idx_verify_token (verify_token),
    INDEX idx_reset_token (reset_token)
);

CREATE TABLE `hackathon_db`.`password` (
     `id` INT NOT NULL AUTO_INCREMENT , 
     `name` VARCHAR(150) NOT NULL , 
     `id_users` INT NOT NULL , PRIMARY KEY (`id`), UNIQUE (`id_users`)) ENGINE = InnoDB; 

     ALTER TABLE `users` ADD `first_name` VARCHAR(50) NULL AFTER `updated_at`, ADD `last_name` VARCHAR(50) NULL AFTER `first_name`; 