const connection = require("./js/connection");
const inquirer = require("inquirer");
const logo = require("asciiart-logo");


const longText =
  "Efficient employee management. " +
  "Including reliable and secure " +
  "data protection! ";
logoArt();
init();

async function init() {
    const { action } = await inquirer.prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add Department",
        "Add Role",
        "Add Employee",
        "View Departments",
        "View Roles",
        "View Employess",
        "exit",
      ],
    });
  
    switch (action) {
      case "Add Department":
        await addDepartment();
        init();
        break;
      case "Add Role":
        await addRole();
        init();
        break;
      case "Add Employee":
        await addEmployee();
        init();
        break;
      case "View Departments":
        await viewDepartment();
        init();
        break;
      case "View Roles":
        await viewRoles();
        init();
        break;
      case "View Employess":
        await viewEmployees();
        init();
        break;
      case "exit":
        process.exit(0);
        break;
      default:
        break;
    }
  }

async function viewEmployees() {

const burrito = await connection.query("SELECT * FROM employee;")
    console.table(burrito);
    


}

async function addEmployee() {
    const roleId = "SELECT id, title FROM role;";
    const roleData = await connection.query(roleId);
    const empOpts =
      "SELECT id, CONCAT(first_name,' ',last_name) AS 'Name' FROM employee;";
    const empData = await connection.query(empOpts);
  
    const emp = await inquirer.prompt([
        {
            name: "first_name",
            message: "What is the Employee First Name?",
          },
          {
            name: "last_name",
            message: "What is the Employee Last Name?",
          },
          {
            name: "role_id",
            message: "What is the role for this Employee?",
            type: "list",
            choices: roleData.map((roleItem) => ({
              name: roleItem.title,
              value: roleItem.id,
            })),
          },
          {
            name: "manager_id",
            message: "Who is the Manager for this Employee?",
            type: "list",
            choices: empData.map((empItem) => ({
              name: empItem.Name,
              value: empItem.id,
            })),
          },
        ]);
    console.log(emp.manager_id);
    console.log(emp.role_id);
    var query = await connection.query("INSERT INTO employee SET ?", {
      first_name: emp.first_name,
      last_name: emp.last_name,
      role_id: emp.role_id,
      manager_id: emp.manager_id,
    });
    console.log("employee inserted!\n");

  }

async function viewDepartment() {
  
    const burrito = await connection.query("SELECT * FROM department;")
        console.table(burrito);
      
   
    
    }
async function addDepartment() {
  const dept = await inquirer.prompt([
    {
      name: "dept",
      message: `What is the Department name?`,
    },
  ]);

  var query = await connection.query("INSERT INTO department SET ?", {
    dept: dept.dept,
  });
  console.log(` Department inserted!\n`);
}

async function viewRoles() {

    const burrito = await connection.query("SELECT * FROM role;")
        console.table(burrito);
      
    
    
    }
    async function addRole() {
      let query = "SELECT * FROM department";
      const deptData = await connection.query(query);
      const departmentName = deptData.map((dept) => dept.dept);
      const { role, salary, dept } = await inquirer.prompt([
        {
          name: "role",
          type: "input",
          message: "What role would you like to add?",
        },
        {
          name: "salary",
          type: "input",
          message: "What is the salary of this role?",
        },
        {
          name: "dept",
          type: "list",
          message: "What department is this role in?",
          choices: departmentName,
        },
      ]);
      const deptObj = deptData.find((department) => dept === department.dept);
      query = "INSERT INTO role (title, salary, dept_id) VALUES (?, ?, ?)";
      const data = await connection.query(query, [role, salary, deptObj.id]);
      console.log(` Role inserted!\n`);

    }
    
    
function logoArt() {
  console.log(
    logo({
      name: "The Employee Database!",
      font: "Speed",
      lineChars: 10,
      padding: 2,
      margin: 3,
      borderColor: "grey",
      logoColor: "bold-blue",
      textColor: "blue",
    })
      .emptyLine()
      .right("version 1.0.0")
      .emptyLine()
      .center(longText)
      .render()
  );
}



