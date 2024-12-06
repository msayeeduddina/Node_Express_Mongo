const data = {
  employees: require("../model/employee.json"),
  setEmployees: function (data) {
    this.employees = data;
  },
};

const getAllEmployee = (req, res) => {
  res.json(data.employees);
};

const createEmployee = (req, res) => {
  const newEmployee = {
    id: data.employees?.length
      ? data.employees[data.employees.length - 1].id + 1
      : 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  };
  if (!newEmployee.firstname || !newEmployee.lastname) {
    return res.status(400).json({ message: "Need firstname and lastname" });
  }
  data.setEmployees([...data.employees, newEmployee]);
  return res
    .status(201)
    .json({ data: data.employees, message: "new employee added" });
};

const updateEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res.status(400).json({ message: "employee id not found" });
  }
  if (req.body.firstname) {
    employee.firstName === req.body.firstname;
  }
  if (req.body.lastname) {
    employee.lastname === req.body.lastname;
  }
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  const unsortedEmployee = [...filteredArray, employee];
  data.setEmployees(unsortedEmployee.sort((a, b) => a.id - b.id));
  res.json(data.employees);
};

const deleteEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res.status(400).json({ message: "employee id not found" });
  }
  const filteredArray = data.employees.filter(
    (emp) => emp.id !== parseInt(req.body.id)
  );
  data.setEmployees([...filteredArray]);
  res.json(data.employees);
};

const getEmployee = (req, res) => {
  const employee = data.employees.find(
    (emp) => emp.id === parseInt(req.body.id)
  );
  if (!employee) {
    return res.status(400).json({ message: "employee id not found" });
  }
  return res.status(200).json({ employee: employee });
};

module.exports = {
  getAllEmployee,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
