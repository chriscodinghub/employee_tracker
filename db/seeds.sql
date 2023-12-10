INSERT INTO department (id, dept_name)
VALUES 
(id, "Math"),
(id, "Science"),
(id, "History"),
(id, "English"),
(id, "PE");


INSERT INTO job (id, title, salary, department_id)
VALUES
(id, 'Math Lead', 75000, 1),
(id, "Math Teacher", 65000, 1),
(id, 'Science Lead', 75000, 2),
(id, "Science Teacher", 65000, 2),
(id, 'History Lead', 75000, 3),
(id, "History Teacher", 65000, 3),
(id, 'English Lead', 75000, 4),
(id, "English Teacher", 65000, 4),
(id, 'PE Lead', 75000, 5),
(id, "PE Teacher", 65000, 5);

INSERT INTO employee (first_name, last_name, role_id, managers_name)
VALUES
("Chris", "Davis", 1, NULL),
("Sean", "Jenkins", 2, "Chris Davis"),
("John", "Snow", 2, "Chris Davis"),
("Jamie", "Foster", 3, NULL),
("Nick", "Row", 4, "Jamie Foster"),
("Daniel", "Ratcliff", 4, "Jamie Foster"),
("Max", "Effort", 5, NULL),
("Serious", "Black", 6, "Max Effort"),
("Harry", "Potter", 6, "Max Effort"),
("Eli", "Manning", 7, NULL),
("Peton", "Manning", 8, "Eli Manning"),
("Jimmy", "G", 8, "Eli Manning"),
("Dead", "Pool", 9, NULL),
("Flash", "Gorden", 10, "Dead Pool");
