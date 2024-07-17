exports.create = async (req, res) => {
  if (req.method === "GET") {
    return res.render("dashboard/employee/create", {
      title: "Employee",
    });
  }
};
