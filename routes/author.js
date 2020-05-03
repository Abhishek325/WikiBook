const express = require("express");
const router = express.Router();

const authorController = require("../controllers/author");

router.get("/list", authorController.getAuthorList);

router.get("/edit/:id", authorController.getEditAuthor);
router.post("/edit", authorController.postEditAuthor);

router.get("/add", authorController.getAddAuthor);
router.post("/add", authorController.postAddAuthor);

router.post("/delete", authorController.deleteAuthor);

//books by author
router.get("/:id/books", authorController.getBooksForAuthor);

module.exports = router;
