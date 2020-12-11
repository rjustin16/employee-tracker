USE employee_db;

INSERT INTO department (dept)
VALUES ("Sales"),("Engineering"),("Legal");

INSERT INTO role (title, salary, dept_id)
VALUES ("Salesperson", 75000, 1),("Lead Engineering", 80000, 2),("Legal", 110000, 3);