const path = require("path");

const Author = require("../models/author.model");

exports.getAuthorList = (req, res, next) => {
  Author.findAll()
    .then((result) => {
      res.render(path.join(__dirname, "..", "views", "author", "list.ejs"), {
        authors: result,
        page: "authors",
        title: "Authors",
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
