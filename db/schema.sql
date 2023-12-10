DROP DATABASE IF EXISTS employeelist_db;

CREATE DATABASE employeelist_db;


USE employeelist_db;


CREATE TABLE department (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  dept_name VARCHAR(30) NOT NULL
);

CREATE TABLE job (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL
);

CREATE TABLE employee (
  id INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  managers_name VARCHAR(30),
  FOREIGN KEY (role_id) REFERENCES job(id)
);

