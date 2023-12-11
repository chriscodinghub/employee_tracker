const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();
const inquirer = require('./index');
require('dotenv').config();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


app.get('/api/department', (req, res) => {
    const sql = `SELECT * FROM department`;
    
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

  app.get('/api/job', (req, res) => {
    const sql = `SELECT job.title, job.id, department.dept_name AS department, job.salary
    FROM job
    JOIN department ON job.department_id = department.id;`;
    
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

  app.get('/api/employee', (req, res) => {
    const sql = `SELECT employee.id, employee.first_name, employee.last_name, job.title, department.dept_name, job.salary, employee.managers_name
    FROM employee
    JOIN job ON employee.role_id = job.id
    JOIN department ON job.department_id = department.id;`;
    
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

  app.get('/api/all', (req, res) => {
    const sql = `SELECT department.dept_name, job.title, job.salary, employee.first_name, employee.last_name, employee.managers_name
FROM department
JOIN job ON department.id = job.department_id
JOIN employee ON job.id = employee.role_id;`;
    
    db.query(sql, (err, rows) => {
      if (err) {
        res.status(500).json({ error: err.message });
         return;
      }
      res.json({
        message: 'success',
        data: rows
      });
    });
  });

  app.post('/api/department', (req, res) => {
    const { id, dept_name } = req.body;
  
    const sql = `INSERT INTO department (id, dept_name) VALUES (?, ?)`;
    const values = [id, dept_name];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'success',
        data: result
      });
    });
  });

  app.post('/api/job', (req, res) => {
    const { id, title, salary, department_id } = req.body;
  
    const sql = `INSERT INTO job (id, title, salary, department_id) VALUES (?, ?, ?, ?)`;
    const values = [id, title, salary, department_id];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'success',
        data: result
      });
    });
  });

  app.post('/api/employee', (req, res) => {
    const { id, first_name, last_name, role_id, managers_name } = req.body;
  
    const sql = `INSERT INTO employee (id, first_name, last_name, role_id, managers_name) VALUES (?, ?, ?, ?, ?)`;
    const values = [id, first_name, last_name, role_id, managers_name];
  
    db.query(sql, values, (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
        return;
      }
  
      res.json({
        message: 'success',
        data: result
      });
    });
  });
    



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
