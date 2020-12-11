const connection = require("./js/connection");
const inquirer = require("inquirer");

init();

async function init() {
  const { choice } = await inquirer.prompt({
    name: "choice",
    type: "list",
    message: "What would you like to do?",
    choices: [
      "VIEW EMPLOYEES",
      "VIEW EMPLOYEES BY DEPARTMENT",
      "VIEW EMPLOYEES BY MANAGER",
      "ADD EMPLOYEE",
      "REMOVE EMPLOYEE",
      "UPDATE EMPLOYEE ROLE",
      "UPDATE EMPLOYEE MANAGER",
      "VIEW DEPARTMENTS",
      "ADD DEPARTMENTS",
      "REMOVE DEPARTMENTS",
      "VIEW ROLES",
      "ADD ROLE",
      "REMOVE ROLE",
      "exit",
    ],
  });

  switch (choice) {
    case "VIEW EMPLOYEES":
        viewEmployees();
      break;
    case "VIEW EMPLOYEES BY DEPARTMENT":
        viewEmployeesByDepartment();
      break;
    case "VIEW EMPLOYEES BY MANAGER":
        viewEmployeesByManager();
      break;
      case "ADD EMPLOYEE":
        addEmployee();
      break;
      case "REMOVE EMPLOYEE":
        removeEmployee();
      break;
      case "UPDATE EMPLOYEE ROLE":
        updateEmployeeRole();
      break;
      case "UPDATE EMPLOYEE MANAGER":
        updateEmployeeManager();
      break;
      case "VIEW DEPARTMENTS":
        viewDepartment();
      break;
      case "ADD DEPARTMENTS":
        addDepartment();
      break;
      case "REMOVE DEPARTMENTS":
        removeDepartment();
      break;
      case "VIEW ROLES":
        viewRoles();
      break;
      case "ADD ROLE":
        addRole();
      break;
      case "REMOVE ROLE":
        removeRole();
      break;
    case "exit":
      process.exit(0);
      break;
    default:
      break;
  }
}

async function viewEmployees() {
  const { dept } = await inquirer.prompt({
    name: "artist",
    type: "input",
    message: "What department would you like to search for?",
  });
  const query = "SELECT * FROM employee_db.department;";
  const data = await connection.query(query, { dept });
  console.table(data);
  init();
}
// async function viewEmployeesByDepartment()
// async function viewEmployeesByManager()
// async function addEmployee()
// async function removeEmployee()
// async function updateEmployeeRole()
// async function updateEmployeeManager()
// async function viewDepartment()
// async function addDepartment()
// async function removeDepartment()
// async function viewRoles()
// async function addRole()
// async function removeRole()


