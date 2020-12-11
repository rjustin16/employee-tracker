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
        `Add Department`,
        `Add Role`,
        `Add Employee`,
        `View Departments`,
        `View Roles`,
        `View Employess`,
        `Update Employee`,
        "exit",
      ],
    });
  
    switch (action) {
      case `Add Department`:
        await addDepartment();
        init();
        break;
      case `Add Role`:
        await addRole();
        init();
        break;
      case `Add Employee`:
        await addEmployee();
        init();
        break;
      case `View Departments`:
        await viewDepartment();
        init();
        break;
      case `View Roles`:
        await viewRoles();
        init();
        break;
      case `View Employess`:
        await viewEmployees();
        init();
        break;
    //   case `${UPDATEEMP}`:
    //     await updateEmpRoles();
    //     init();
    //     break;
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
    const roleId = "select id, title from role;";
    const roleData = await connection.query(roleId);
    const empOpts =
      "select id, CONCAT(first_name,' ',last_name) AS 'Name' from employee;";
    const empData = await connection.query(empOpts);
  
    const emp = await inquirer.prompt([
        {
            name: "first_name",
            message: `What is the Employee First Name?`,
          },
          {
            name: "last_name",
            message: `What is the Employee Last Name?`,
          },
          {
            name: "role_id",
            message: `What is the role for this Employee? `,
            type: "list",
            choices: roleData.map((roleItem) => ({
              name: roleItem.title,
              value: roleItem.id,
            })),
          },
          {
            name: "manager_id",
            message: `Who is the Manager for this Employee? `,
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
    console.log(` employee inserted!\n`);

  }

async function viewDepartment() {
  
    const burrito = await connection.query("SELECT * FROM department;")
        console.table(burrito);
      
   
    
    }
// async function addDepartment() {

//     const burrito = await connection.query("SELECT * FROM employee;")
//         console.table(burrito);
//         connection.end();
//       init();
    
//     }

async function viewRoles() {

    const burrito = await connection.query("SELECT * FROM role;")
        console.table(burrito);
      
    
    
    }
// async function addRole() {

//     const burrito = await connection.query("SELECT * FROM employee;")
//         console.table(burrito);
//         connection.end();
//       init();
    
//     }
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



