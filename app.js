const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const path = require("path");

const sequelize = require("./utils/database");
const session = require("express-session");
//session store setup
const mysqlStore = require("express-mysql-session")(session);
const options = {
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "book_store",
};
const sessionStore = new mysqlStore(options);

app.set("view engine", "ejs"); //embedded javscript templates
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "abh1sh3k",
    resave: false,
    store: sessionStore,
    saveUninitialized: false,
  })
);

const authorRoutes = require("./routes/author");
const productRoutes = require("./routes/product");
const loginRoutes = require("./routes/login");
const isAuth = require("./middleware/isAuth");

app.use("/product", isAuth, productRoutes);
app.use("/author", isAuth, authorRoutes);
app.use(loginRoutes, isAuth);

const Products = require("./models/product.model");
const Author = require("./models/author.model");

app.use("/", (req, res, next) => {
  res.redirect("/author/list");
});

app.use((req, res, next) => {
  res.render(path.join(__dirname, "views", "error/404.ejs"), {
    title: "Page not found",
  });
});

//Associations
Author.hasMany(Products);
Products.belongsTo(Author);

sequelize
  .sync()
  .then((result) => {
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
