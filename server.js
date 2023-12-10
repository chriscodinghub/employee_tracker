const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employeelist_db'
})

app.get('/api/departments', (req, res) => {
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
    const sql = `SELECT * FROM job`;
    
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
    const sql = `SELECT * FROM employee`;
    
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



app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
