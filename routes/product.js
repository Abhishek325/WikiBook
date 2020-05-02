const express = require("express");
const router = express.Router();

const productController = require("../controllers/product");

router.get("/list", productController.getProductList);

router.get("/edit/:id", productController.getEditProduct);
router.post("/edit", productController.postEditProduct);

router.get("/add", productController.getAddProduct);
router.post("/add", productController.postAddProduct);

router.post("/delete", productController.deleteProductById);

module.exports = router;
