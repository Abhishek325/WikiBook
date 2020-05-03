const path = require("path");

exports.getLogin = (req, res, next) => {
  res.render(path.join(__dirname, "..", "views", "login.ejs"), {
    title: "Login",
    page: "login",
    isLoggedIn: req.session.isLoggedIn,
  });
};

exports.postLogin = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  // only for learning
  if (email == "admin@wikibook.com" && password == "admin") {
    req.session.isLoggedIn = true;
    res.redirect("/list/books");
  }
};

exports.postLogout = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/login");
  });
};
