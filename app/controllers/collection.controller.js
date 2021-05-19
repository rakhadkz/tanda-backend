const db = require("../models");
const mongoose = require('mongoose');
const cloudinary = require("cloudinary");
const Collection = db.collection;
const CollectionProduct = db.collectionProduct;
const CollectionMember = db.collectionMember;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});



//TODO: Create new collection
exports.createCollection = (req, res) => {
    new Collection({
        name: req.body.name,
        cover: req.body.cover,
        shopId: mongoose.Types.ObjectId(req.body.shopId)
    }).save((err, collection) => {
        if (err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else {
            new CollectionMember({
                collectionId: collection._id,
                memberId: req.user._id,
                state: "verified",
                role: "author"
            }).save((err, member) => {
                if (err) {
                    res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
                } else {
                    res.status(200).send({ collection: collection, member: member });
                }
            });
        }
    });
};


//TODO: Add members to collection
exports.addMembers = (req, res) => {
    if(req.body.members && req.body.members.length > 0) {
        let multipleUpload = req.body.members.map(member => new Promise(((resolve, reject) => {
            new CollectionMember({
                collectionId: mongoose.Types.ObjectId(req.params.id),
                memberId: mongoose.Types.ObjectId(member)
            }).save((err, member) => {
                if(err) reject(err);
                else resolve(member);
            });
        })));


        Promise.all(multipleUpload).then(members =>  {
            res.status(200).send(members);
        }).catch((err) => {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        });
    } else {
        res.status(404).send("Список пуст");
    }
};


//TODO: Respond to invitation
exports.respondInvitation = (req, res) => {
    CollectionMember.findOneAndUpdate({ memberId: req.userId, collectionId: req.params.id }, { state: req.body.response }, { new: true }, (err, member) => {
        if (err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else {
            res.status(200).send(member);
        }
    });
};


//TODO: Update existing collection
exports.updateCollection = (req, res) => {
    const updates = {};
    if(req.body.name) {
        updates.name = req.body.name;
    }
    if(req.body.cover) {
        updates.cover = req.body.cover;
    }
    if(req.body.public && req.collectionMember.role === "author") {
        updates.public = req.body.public;
    }
    Collection.findByIdAndUpdate(req.params.id, updates, { new: true }, (err, collection) => {
        if (err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else {
            res.status(200).send(collection);
        }
    });
};


//TODO: Search public collections
exports.getPublic = (req, res) => {
    if(req.query.name) {
        Collection.find({ public: true, name: new RegExp(req.query.name, "i")}, (err, collections) => {
            if (err) {
                res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
            } else {
                res.status(200).send(collections);
            }
        });
    } else if (req.query.userId) {
        CollectionMember.find({ memberId: req.query.userId, role: "author" }).populate({ path: "collectionId", match: { public: true }}).exec((err, collections) => {
            if (err) {
                res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
            } else {
                res.status(200).send(collections);
            }
        });
    } else {
        res.status(404).send("Запрос не найден");
    }
}


//TODO: Get my collections
exports.getMine = (req, res) => {
    CollectionMember.find({ memberId: req.userId, state: { in: ["pending", "verified"]} }).populate("collectionId").exec((err, collections) => {
        if (err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else {
            res.status(200).send(collections);
        }
    });
}


//TODO: Get by id
exports.getById = (req, res) => {
    Collection.findById(req.params.id).populate("shopId").exec((err, collection) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(collection);
        }
    });
}


//TODO: Duplicate collection
exports.duplicateCollection = (req, res) => {
    new Collection({
        name: req.body.name,
        cover: req.body.cover,
        shopId: mongoose.Types.ObjectId(req.body.shopId)
    }).save((err, collection) => {
        if (err) {
            res.status(500).send(err);
        } else {
            new CollectionMember({
                collectionId: collection._id,
                memberId: mongoose.Types.ObjectId(req.userId),
                state: "verified",
                role: "author"
            }).save((err, member) => {
                if (err) {
                    res.status(500).send(err);
                } else {
                    CollectionProduct.find({ collectionId: req.params.id }, (err, products) => {
                        if (err) {
                            res.status(500).send(err);
                        } else {
                            let multipleUpload = products.map(product => new Promise(((resolve, reject) => {
                                product._doc._id = mongoose.Types.ObjectId();
                                product.isNew = true;
                                product._doc.collectionId = collection._id;
                                product.save((err, newProduct) => {
                                    if(err) reject(err);
                                    else resolve(newProduct);
                                });
                            })))


                            Promise.all(multipleUpload).then(newProducts =>  {
                                res.status(200).send({ collection: collection, member: member, newProducts: newProducts});
                            }).catch((err) => {
                                res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
                            });
                        }
                    });
                }
            });
        }
    });
};


//TODO: Leave collection
exports.leaveCollection = (req, res) => {
    if(req.query.userId)  {
        CollectionMember.findOneAndDelete({ memberId: req.query.userId, collectionId: req.params.id, state: "pending" }, {}, (err, member) => {
            if (err) {
                res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
            } else {
                res.status(200).send(member);
            }
        })
    } else {
        CollectionMember.findOneAndDelete({ memberId: req.userId, collectionId: req.params.id }, {}, (err, member) => {
            if (err) {
                res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
            } else {
                res.status(200).send(member);
            }
        })
    }
};


//TODO: Get all members
exports.getMembers = (req, res) => {
    CollectionMember.find({ collectionId: req.params.id, state: { in: ["verified", "pending"] }}, (err, members) => {
        if (err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else {
            res.status(200).send(members);
        }
    })
}


//TODO: Add product
exports.addProduct = (req, res) => {
    new CollectionProduct({
        collectionId: mongoose.Types.ObjectId(req.params.id),
        productId: mongoose.Types.ObjectId(req.body.productId),
        productPriceId: mongoose.Types.ObjectId(req.body.productPriceId),
        replacementForId: mongoose.Types.ObjectId(req.body.replacementForId),
        quantity: req.body.quantity
    }).save((err, product) => {
        if (err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else {
            res.status(200).send(product);
        }
    });
}


//TODO: Update product
exports.updateProduct = (req, res) => {
    let updates = {};
    if(req.body.quantity) {
        updates.quantity = req.body.quantity;
    }
    if(req.body.checked) {
        updates.checked = req.body.checked;
    }
    CollectionProduct.findByIdAndUpdate(req.params.productId, updates, { new: true }, (err, product) => {
        if (err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else {
            res.status(200).send(product);
        }
    });
}


//TODO: Delete product
exports.deleteProduct = (req, res) => {
    CollectionProduct.findByIdAndDelete(req.params.productId, (err, product) => {
        if (err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else {
            res.status(200).send(product);
        }
    });
}