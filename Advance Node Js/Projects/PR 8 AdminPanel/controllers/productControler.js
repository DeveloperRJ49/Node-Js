const categoryModel = require("../models/catagoryModel");

const subcategoryModel = require("../models/subcategoryModels");

const exsubcategoryModel = require("../models/exsubcategoryModel");

const productModel = require("../models/productModel");

const viewProducts = async (req, res) => {
  try {
    let product = await productModel
      .find({})
      .populate("categoryid")
      .populate("subcategoryid")
      .populate("exsubcategoryid");
    return res.render("product/viewproduct", {
      product: product,
    });
  } catch (err) {
    console.log(err);
    return false;
  }
};

const addProductPage = async (req, res) => {
  try {
    let category = await categoryModel.find({ status: "active" });
    let subcategory = await subcategoryModel.find({ status: "active" });
    let exsubcategory = await exsubcategoryModel.find({ status: "active" });
    return res.render("product/addproduct", {
      category,
      subcategory,
      exsubcategory,
    });
  } catch (err) {
    console.log(err);
  }
};

const addProductdata = async (req, res) => {
  try {
    const {
      category,
      subcategory,
      exsubcategory,
      product,
      description,
      price,
      quantity,
    } = req.body;
    await productModel.create({
      categoryid: category,
      subcategoryid: subcategory,
      exsubcategoryid: exsubcategory,
      product: product,
      description: description,
      price: price,
      quantity: quantity,
    });
    return res.redirect("/product/viewproduct");
  } catch (err) {
    console.log(err);
  }
};

const getCategory = async (req, res) => {
  try {
    const id = req.query.id;
    const subcategory = await exsubcategoryModel.find({ subcategoryid : id });
    return res.send({
      success: true,
      message: "its Working",
      subcategory,
    });
  } catch (error) {
    console.log(error);
    return false;
  }
};

module.exports = {
  addProductPage,
  viewProducts,
  addProductdata,
  getCategory,
};
