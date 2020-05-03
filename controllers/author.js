const path = require("path");

const Author = require("../models/author.model");
const Product = require("../models/product.model");

exports.getAuthorList = (req, res, next) => {
  Author.findAll()
    .then((result) => {
      res.render(path.join(__dirname, "..", "views", "author", "list.ejs"), {
        authors: result,
        page: "authors",
        title: "Authors",
        isLoggedIn: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

//Add new author
exports.getAddAuthor = (req, res, next) => {
  res.render(path.join(__dirname, "..", "views", "author", "add.ejs"), {
    page: "add_authors",
    title: "Add new author",
    isLoggedIn: req.session.isLoggedIn,
  });
};
exports.postAddAuthor = (req, res, next) => {
  const name = req.body.name;
  const description = req.body.desc;
  const imageUrl = req.body.image_url;
  Author.create({
    name: name,
    description: description,
    imageUrl: imageUrl,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((err) => {
      console.log(err);
    });
};

//Edit author
exports.getEditAuthor = (req, res, next) => {
  const id = req.params.id;
  Author.findOne({
    where: {
      id: id,
    },
  }).then((result) => {
    res.render(path.join(__dirname, "..", "views", "author", "edit.ejs"), {
      author: result,
      title: "Edit - " + result.name,
      page: null,
      isLoggedIn: req.session.isLoggedIn,
    });
  });
};
exports.postEditAuthor = (req, res, next) => {
  const id = req.body.id;
  const name = req.body.name;
  const description = req.body.description;
  const imageUrl = req.body.image_url;

  Author.findOne({
    where: {
      id: id,
    },
  })
    .then((author) => {
      author.name = name;
      author.description = description;
      author.imageUrl = imageUrl;
      author.save();
    })
    .then(() => {
      res.redirect("/author/list");
    })
    .catch((err) => {
      console.log(err);
    });
};

//Delete author
exports.deleteAuthor = (req, res, next) => {
  const id = req.body.id;
  Author.destroy({
    where: {
      id: id,
    },
  })
    .then(() => {
      res.redirect("/author/list");
    })
    .catch((err) => {
      console.log(err);
    });
};

//Get books for author:
exports.getBooksForAuthor = (req, res, next) => {
  const authorId = req.params.id;
  Product.findAll({
    where: {
      authorId: authorId,
    },
  })
    .then((result) => {
      res.render(path.join(__dirname, "..", "views", "product", "list.ejs"), {
        products: result,
        page: "products",
        title: "Product list",
        isLoggedIn: req.session.isLoggedIn,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
