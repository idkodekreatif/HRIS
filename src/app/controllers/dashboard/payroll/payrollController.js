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
    const netsalary = basicSalary + allowance - deductions;

    const payroll = new Payroll({
      employee,
      payPeriod,
      basicSalary,
      allowance,
      deductions,
      netsalary,
    });

    await payroll.save();
    res.redirect("/payroll");
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
    const netsalary = basicSalary + allowance - deductions;

    let payroll = await Payroll.findById(req.params.id);
    if (!payroll) {
      return res.status(404).send("Payroll not found");
    }
    payroll.employee = employee;
    payroll.payPeriod = payPeriod;
    payroll.basicSalary = basicSalary;
    payroll.allowance = allowance;
    payroll.deductions = deductions;
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
