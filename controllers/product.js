const path = require("path");

const Product = require("../models/product.model");
const Author = require("../models/author.model");

exports.getProductList = (req, res, next) => {
  Product.findAll()
    .then((result) => {
      res.render(path.join(__dirname, "..", "views", "product", "list"), {
        products: result,
        page: "products",
        title: "Product list",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Add new product
exports.getAddProduct = (req, res, next) => {
  Author.findAll().then((authorResult) => {
    res.render(path.join(__dirname, "..", "views", "product", "add"), {
      authors: authorResult,
      page: "add_products",
      title: "Add new product",
    });
  });
};
exports.postAddProduct = (req, res, next) => {
  const name = req.body.book_name;
  const price = req.body.price;
  const description = req.body.desc;
  const imageUrl = req.body.image_url;
  Product.create({
    name: name,
    price: price,
    description: description,
    imageUrl: imageUrl,
  })
    .then(() => {
      res.redirect("/product/list");
    })
    .catch((err) => {
      console.log(err);
    });
};

//Edit product
exports.getEditProduct = (req, res, next) => {
  const id = req.params.id;
  Product.findOne({
    where: {
      id: id,
    },
  })
    .then((result) => {
      res.render(path.join(__dirname, "..", "views", "product", "edit"), {
        product: result,
        page: null,
        title: "Edit - " + result.name,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
exports.postEditProduct = (req, res, next) => {
  const id = req.body.id;
  const name = req.body.book_name;
  const price = req.body.price;
  const rating = req.body.rating;
  const description = req.body.desc;
  Product.findOne({
    where: {
      id: id,
    },
  })
    .then((product) => {
      product.name = name;
      product.price = price;
      product.rating = rating;
      product.description = description;
      product.save();
    })
    .then(() => {
      res.redirect("/product/list");
    })
    .catch((err) => {
      console.log(err);
    });
};

//Delete product
exports.deleteProductById = (req, res, next) => {
  const id = req.body.id;
  Product.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/product/list");
    })
    .catch((err) => {
      console.log(err);
    });
};
