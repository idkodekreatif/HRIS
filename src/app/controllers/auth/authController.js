exports.login = async (req, res) => {
  if (req.method === "GET") {
    return res.render("auth/signin", {
      title: "Login",
      layout: "./layouts/auth",
    });
  }
};
