const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
require('dotenv').config();

// Create a MySQL connection
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  });



function startApp() {
    inquirer
      .prompt([
        {
          type: 'list',
          name: 'menuChoice',
          message: 'What would you like to do?',
          choices: [
            'View all departments',
            'View all jobs',
            'View all employees',
            'Add a department',
            'Add a job',
            'Add an employee',
            'Update an employee role',
          ],
        },
        {
          type: 'input',
          name: 'departmentName',
          message: 'Enter the name of the department:',
          when: (answers) => answers.menuChoice === 'Add a department',
        },
        {
            type: 'input',
            name: 'jobName',
            message: 'Enter the title, salary, department_id of the job:',
            when: (answers) => answers.menuChoice === 'Add a job',
        },
        {
            type: 'input',
            name: 'employeeName',
            message: 'Enter the first_name, last_name, role_id, managers_name:',
            when: (answers) => answers.menuChoice === 'Add an employee',
        },
        {
            type: 'input',
            name: 'employeeToUpdate',
            message: 'Select an employee to update via id:',
            when: (answers) => answers.menuChoice === 'Update an employee role',
        },
      ])
      .then((answers) => {
        console.log(answers);
        if (answers.menuChoice === 'View all departments') {
          console.log('Performing "View all departments" logic');
          connection.query('SELECT * FROM department', (err, results) => {
            if (err) throw err;
            // Display the results in a formatted table
            console.table(results);
            startApp();
          });
        } else if (answers.menuChoice === 'View all jobs') {
          console.log('Performing "View all jobs" logic');
          connection.query('SELECT job.title, job.id, department.dept_name AS department, job.salary FROM job JOIN department ON job.department_id = department.id;', (err, results) => {
            if (err) throw err;
            // Display the results in a formatted table
            console.table(results);
            startApp();
          });
        } else if (answers.menuChoice === 'View all employees') {
          console.log('Performing "View all employees" logic');
          connection.query('SELECT employee.id, employee.first_name, employee.last_name, job.title, department.dept_name, job.salary, employee.managers_name FROM employee JOIN job ON employee.role_id = job.id JOIN department ON job.department_id = department.id;', (err, results) => {
            if (err) throw err;
            // Display the results in a formatted table
            console.table(results);
            startApp();
          });
        } else if (answers.menuChoice === 'Add a department') {
          console.log('Performing "Add a department" logic');
          connection.query(
            'INSERT INTO department (dept_name) VALUES (?)',
            [answers.departmentName],
            (err, result) => {
              if (err) throw err;
              console.log('Department added successfully');
              startApp();
            }
          );
        } else if (answers.menuChoice === 'Add a job') {
          console.log('Performing "Add a job" logic');
          const [title, salary, departmentId] = answers.jobName.split(',').map(value => value.trim());

            connection.query(
            'INSERT INTO job (title, salary, department_id) VALUES (?, ?, ?)',
            [title, salary, departmentId],
            (err, result) => {
                if (err) throw err;
                console.log('Job added successfully');
                startApp();
            }
          );

        } else if (answers.menuChoice === 'Add an employee') {
            console.log('Performing "Add an employee" logic');
            const [first_name, last_name, role_id, managers_name] = answers.employeeName.split(',').map(value => value.trim());
          
            connection.query(
              'INSERT INTO employee (first_name, last_name, role_id, managers_name) VALUES (?, ?, ?, ?)',
              [first_name, last_name, role_id, managers_name],
              (err, result) => {
                if (err) throw err;
                console.log('Employee added successfully');
                startApp();
              }
            );
          

        } else if (answers.menuChoice === 'Update an employee role') {
          console.log('Performing "Update an employee role" logic');
          console.log('FEATURE NOT WORKING')
          startApp()
        //   const [first_name, last_name, role_id, managers_name] = answers.employeeToUpdate.split(',').map(value => value.trim());
          
        //     connection.query(
        //       'INSERT INTO employee (first_name, last_name, role_id, managers_name) VALUES (?, ?, ?, ?)',
        //       [first_name, last_name, role_id, managers_name],
        //       (err, result) => {
        //         if (err) throw err;
        //         console.log('Employee updated successfully');
        //         startApp();
        //       }
        //     );
        } else {
          console.log('Invalid menu choice');
        }
      });
  }
  
  // Start the app
  startApp();