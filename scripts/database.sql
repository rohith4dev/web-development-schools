-- Create database
CREATE DATABASE IF NOT EXISTS school_db;

-- Use the database
USE school_db;

-- Create table
CREATE TABLE IF NOT EXISTS schools (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  city TEXT NOT NULL,
  state TEXT NOT NULL,
  contact VARCHAR(20) NOT NULL,
  image TEXT NOT NULL,
  email_id VARCHAR(100) NOT NULL
);
