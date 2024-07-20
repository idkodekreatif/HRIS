const Payroll = require("../../../models/Payroll");
const Employee = require("../../../models/Employee");

exports.index = async (req, res) => {
  try {
    const payrolls = await Payroll.find().populate("employee");
    res.render("dashboard/payroll/index", {
      payrolls,
      title: "Payroll",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.create = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.render("dashboard/payroll/create", {
      employees,
      title: "Create Payroll",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.store = async (req, res) => {
  try {
    const { employee, payPeriod, basicSalary, allowance, deductions } =
      req.body;

    // Ensure all salary-related values are parsed as numbers
    const basicSalaryNum = Number(basicSalary);
    const allowanceNum = Number(allowance);
    const deductionsNum = Number(deductions);

    const netsalary = basicSalaryNum + allowanceNum - deductionsNum;

    const payroll = new Payroll({
      employee,
      payPeriod,
      basicSalary: basicSalaryNum,
      allowance: allowanceNum,
      deductions: deductionsNum,
      netsalary,
    });

    await payroll.save();
    res.redirect("/payroll");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.show = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id).populate("employee");
    const employees = await Employee.find();

    if (!payroll) {
      return res.status(404).send("Payroll not found");
    }
    res.render("dashboard/payroll/show", {
      payroll,
      employees,
      title: "Edit Payroll",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.edit = async (req, res) => {
  try {
    const payroll = await Payroll.findById(req.params.id).populate("employee");
    const employees = await Employee.find();

    if (!payroll) {
      return res.status(404).send("Payroll not found");
    }
    res.render("dashboard/payroll/edit", {
      payroll,
      employees,
      title: "Edit Payroll",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.update = async (req, res) => {
  try {
    const { employee, payPeriod, basicSalary, allowance, deductions } =
      req.body;

    // Ensure all salary-related values are parsed as numbers
    const basicSalaryNum = Number(basicSalary);
    const allowanceNum = Number(allowance);
    const deductionsNum = Number(deductions);

    const netsalary = basicSalaryNum + allowanceNum - deductionsNum;

    let payroll = await Payroll.findById(req.params.id);
    if (!payroll) {
      return res.status(404).send("Payroll not found");
    }

    payroll.employee = employee;
    payroll.payPeriod = payPeriod;
    payroll.basicSalary = basicSalaryNum;
    payroll.allowance = allowanceNum;
    payroll.deductions = deductionsNum;
    payroll.netsalary = netsalary;

    await payroll.save();
    res.redirect("/payroll");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    await Payroll.findByIdAndDelete(id);
    res.redirect("/payroll");
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};
