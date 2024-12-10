const express = require('express');

const routes = express.Router();

const passport = require('passport');

const {addExSubCategoryPage,addExSubCategoryData,viewExSubCategory,deleteExSubCategory,editExSubCategory,updateExSubCategory,getCategory,changeStatus} = require('../controllers/exsubcategoryController');

routes.get('/addpage' , passport.checkUser , addExSubCategoryPage);
routes.get('/getcategory', getCategory);
routes.post('/add' , addExSubCategoryData);
routes.get('/viewexsubcategory' , passport.checkUser , viewExSubCategory);

routes.get('/changestatus', changeStatus);

routes.get('/deleteexsubcategory',deleteExSubCategory);
routes.get('/editexsubcategory', editExSubCategory);
routes.post('/update',updateExSubCategory);


module.exports = routes ;