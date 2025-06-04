CREATE DATABASE IF NOT EXISTS school_management;
USE school_management;
CREATE TABLE schools(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address VARCHAR(300) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
)