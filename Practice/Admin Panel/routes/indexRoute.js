const express = require('express');

const routes = express.Router();

routes.use('/', require('../routes/authRoute'));

routes.use('/forget', require('../routes/forgetRoute'));

routes.use('/category',require('../routes/categoryRoute'));

routes.use('/subcategory',require('../routes/subCategoryRoute'));

routes.use('/exsubcategory',require('../routes/exsubcategoryRoute'));

routes.use('/product',require('../routes/productRoute'));

module.exports = routes;