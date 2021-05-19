const db = require("../models");
const mongoose = require("mongoose");
const cloudinary = require("cloudinary");
const Product = db.product;
const ProductDetail = db.productDetail;
const ProductShortName = db.productShortName;
const ProductCategory = db.productCategory;
const ShopProductCategory = db.shopProductCategory;
const ProductSet = db.productSet;
const ProductPrice = db.productPrice;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


//TODO: Search product by name
//TODO: Search product by shop
//TODO: Search product by category
exports.searchProducts = (req, res) => {
    if(req.query.shopId && req.query.name) {
        Product.find({ name: new RegExp(req.query.name, "i")}).populate("categoryId").exec((err, products) => {
            if (err) {
                res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
            } else {
                ProductDetail.find({ shopId: req.query.shopId, productId: { $in: products.map(product => product._id) } }).exec((err, productDetails) => {
                    if (err) {
                        res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
                    } else {
                        let foundProductDetails = productDetails.map(productDetail => {
                            return {
                                ...productDetail,
                                productId: products.find(product => product._id.equals(productDetail.productId))
                            }
                        });
                        res.status(200).send(foundProductDetails);
                    }
                });
            }
        });
    }  else if(req.query.shopId) {
        Product.find({ name: new RegExp(req.query.name, "i")}).populate("categoryId").exec((err, products) => {
            if (err) {
                res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
            } else {
                ProductDetail.find({ shopId: req.query.shopId }).populate("productId").exec((err, productDetails) => {
                    if (err) {
                        res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
                    } else {
                        let foundProductDetails = productDetails.map(productDetail => {
                            return {
                                ...productDetail,
                                productId: products.find(product => product._id.equals(productDetail.productId))
                            }
                        });
                        res.status(200).send(foundProductDetails);
                    }
                });
            }
        });
    } else if(req.query.categoryId) {
        Product.find({ categoryId: req.query.categoryId }).populate("categoryId").exec((err, products) => {
            if (err) {
                res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
            } else {
                res.status(200).send(products);
            }
        });
    } else if (req.query.name) {
        Product.find({ name: new RegExp(req.query.name, "i")}).populate("categoryId").exec((err, products) => {
            if (err) {
                res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
            } else {
                res.status(200).send(products);
            }
        });
    } else {
        res.status(404).send({ message: "Запрос не найден" });
    }
}



//TODO: Get latest product sets
//TODO: Get product sets of a shop
exports.searchProductSets = (req, res) => {
    if(req.query.latest) {
        ProductSet.find().sort("-createdAt").populate("shopId").exec((err, productSets) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(productSets);
            }
        });
    } else if (req.query.shopId) {
        ProductSet.find({ shopId: req.query.shopId }).exec((err, productSets) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(productSets);
            }
        })
    } else {
        res.status(500).send("Query bot found");
    }
}


//TODO: Get product by id
exports.getById = (req, res) => {
    ProductDetail.findOne({ productId: req.params.id }).populate("productId").exec((err, productDetail) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(productDetail);
        }
    });
}


//TODO: Get product set by id
exports.getSetById = (req, res) => {
    ProductSet.findById(req.params.id).populate("requiredPricesId").populate("requiredProductsId").populate("rewardProductsId").populate("rewardPricesId").populate("shopId").exec((err, productSet) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(productSet);
        }
    });
}

//TODO: Create product
exports.createProduct = (req, res) => {
    new Product({
        ...req.body,
        categoryId: mongoose.Types.ObjectId(req.body.categoryId),
        shortNameId: mongoose.Types.ObjectId(req.body.shortNameId)
    }).save((err, product) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(product);
        }
    });
};

//TODO: Update product
exports.updateProduct = (req, res) => {
    Product.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, product) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(product);
        }
    });
};

//TODO: Delete product
exports.deleteProduct = (req, res) => {
    Product.findByIdAndDelete(req.params.id, {}, (err, product) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(product);
        }
    });
};

//TODO: Add product to a shop
exports.addToShop = (req, res) => {
    let multipleUpload = req.body.prices.map(price => new Promise(((resolve, reject) => {
        new ProductPrice({
            ...price,
            productId: mongoose.Types.ObjectId(req.params.id),
            shopId: mongoose.Types.ObjectId(req.params.shopId)
        }).save((err, productPrice) => {
            if(err) reject(err);
            else resolve(productPrice._id);
        })
    })));


    Promise.all(multipleUpload).then(productPrices =>  {
        new ProductDetail({
            productId: mongoose.Types.ObjectId(req.params.id),
            shopId: mongoose.Types.ObjectId(req.params.shopId),
            prices: productPrices,
            origins: req.body.origins.map(origin => {
                return {
                    supplierId: mongoose.Types.ObjectId(origin.supplierId),
                    manufacturerId: mongoose.Types.ObjectId(origin.manufacturerId)
                }
            })
        }).save((err, productDetail) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(productDetail);
            }
        });
    }).catch((err) => {
        res.status(500).send({ message: err });
    });
};


//TODO: Remove product from a shop
exports.deleteFromShop = (req, res) => {
    ProductDetail.findByIdAndDelete(req.params.detailId, {}, (err, productDetail) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(productDetail);
        }
    });
};

//TODO: createShortName
exports.createShortName = (req, res) => {
    new ProductShortName(req.body).save((err, shortName) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(shortName);
        }
    })
};

//TODO: updateShortName
exports.updateShortName = (req, res) => {
    ProductShortName.findByIdAndUpdate(req.body.shortNameId, req.body, { new: true }, (err, shortName) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(shortName);
        }
    })
};

//TODO: Delete ShortName
exports.deleteShortName = (req, res) => {
    ProductShortName.findByIdAndDelete(req.body.shortNameId, {}, (err, shortName) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(shortName);
        }
    })
};

//TODO: update product price
exports.updateProductPrice = (req, res) => {
    const updates = {
        lastUpdated: Date.now()
    }
    if(req.body.discount) {
        updates.discount = req.body.discount
    }
    if(req.body.cost) {
        updates.cost = req.body.cost
    }
    ProductPrice.findOneAndUpdate({ productId: req.params.id, shopId: req.params.shopId }, updates, { new: true }, (err, productPrice) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(productPrice);
        }
    })
};

//TODO: update product price
exports.deleteProductPrice = (req, res) => {
    ProductPrice.findOneAndDelete({ productId: req.params.id, shopId: req.params.shopId }, req.body, { new: true }, (err, productPrice) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(productPrice);
        }
    })
};

//TODO: Search category
//TODO: Get subcategories
exports.searchCategories= (req, res) => {
    if (req.query.name) {
        ProductCategory.find({ name: new RegExp(req.query.name, "i") }, (err, categories) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(categories);
            }
        });
    } else if (req.query.parentId) {
        ProductCategory.find({ parentId: req.query.parentId }, (err, categories) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(categories);
            }
        });
    }
}

//TODO: Get categories of a shop
exports.getShopCategories = (req, res) => {
    ShopProductCategory.find({ shopId: req.params.shopId }).populate("categoryId").exec((err, categories) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(categories);
        }
    });
}

//TODO: Create new product category
exports.createProductCategory = (req, res) => {
    new ProductCategory(req.body).save((err, category) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(category);
        }
    });
};

//TODO: Update existing product category
exports.updateProductCategory = (req, res) => {
    ProductCategory.findByIdAndUpdate(req.params.id, req.body, {}, (err, category) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(category);
        }
    });
};

//TODO: Delete existing product category
exports.deleteProductCategory = (req, res) => {
    ProductCategory.findByIdAndDelete(req.params.id, {}, (err, category) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(category);
        }
    })
};