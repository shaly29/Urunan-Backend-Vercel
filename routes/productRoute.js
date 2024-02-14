const express = require('express');
const { getProducts, getSingleProduct,deleteProduct,updateProduct,createProduct } = require('../controller/productController');
const router = express.Router();

router.route('/products').get(getProducts);
router.route('/product/:id').get(getSingleProduct);
router.route('/product/:id').delete(deleteProduct);
router.route('/product/:id').put(updateProduct);
router.route('/product/new').post(createProduct);
module.exports = router;