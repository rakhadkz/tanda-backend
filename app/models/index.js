const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.foodCategory = require('./foodCategory.model');
db.recipe = require('./recipe.model');
db.consulting = require('./consulting.model');
db.porduct = require('./product.model');
db.address = require('./address.model');
db.chef = require('./chef.model');
db.collection = require('./collection.model');
db.collectionMember = require('./collectionMember.model');
db.collectionProduct = require('./collectionProduct.model');
db.comment = require('./comment.model');
db.coupon = require('./coupon.model');
db.legalDocument = require('./legalDocument.model');
db.like = require('./like.model');
db.manufacturer = require('./manufacturer.model');
db.masterClass = require('./masterClass.model');
db.masterClassMember = require('./masterClassMember.model');
db.mealOrder = require('./mealOrder.model');
db.orderProduct = require('./orderProduct.model');
db.productCategory = require('./productCategory.model');
db.productCategoryCount = require('./productCategoryCount.model');
db.productDetail = require('./productDetail.model');
db.productOrder = require('./productOrder.model');
db.productPrice = require('./productPrice.model');
db.productSet = require('./productSet.model');
db.product = require('./product.model');
db.productShortName = require('./productShortName.model');
db.review = require('./review.model');
db.saved = require('./saved.model');
db.shop = require('./shop.model');
db.shopper = require('./shopper.model');
db.supplier = require('./supplier.model');
db.user = require('./user.model');
db.shopProductCategory = require('./shopProductCategory.model');


module.exports = db;
