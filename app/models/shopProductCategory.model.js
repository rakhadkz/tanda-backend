const mongoose = require("mongoose");

const ShopProductCategoryModel = mongoose.model(
    "ShopProductCategory", new mongoose.Schema({
        shopId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Shop",
            required: true
        },
        categoryId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "ProductCategory",
            required: true
        }
    })
);

module.exports = ShopProductCategoryModel;