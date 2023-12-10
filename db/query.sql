USE employeelist_db;

const sql = `SELECT department.dept_name, job.title, job.salary, employee.first_name, employee.last_name
FROM department
JOIN job ON department.id = job.department_id
JOIN employee ON job.id = employee.role_id;`

