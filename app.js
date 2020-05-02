const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const path = require("path");

const sequelize = require("./utils/database");

app.set("view engine", "ejs"); //embedded javscript templates
app.set("views", "views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

const authorRoutes = require("./routes/author");
const productRoutes = require("./routes/product");

app.use("/product", productRoutes);
app.use("/author", authorRoutes);

const Products = require("./models/product.model");
const Author = require("./models/author.model");

app.use("/",(req, res, next) => {
  res.redirect("/author/list");
})

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
