const db = require("../models");
const addressController = require("./address.controller");
const Shop = db.shop;
const Address = db.address;


//TODO: Search shop
exports.search = (req, res) => {
    if(req.query.name){
        Shop.find({ name: new RegExp(req.query.name, "i") }, (err, shops) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(shops);
            }
        });
    } else if (req.query.lat && req.query.long) {
        Address.find({
            type: "shop",
            location: {
                $near: {
                    $geometry: {
                        type: "Point"
                    },
                    coordinates:[ req.query.long, req.query.lat]
                },
                $maxDistance: req.query.maxDistance ? req.query.maxDistance : 4000
            }
        }).populate("shopId").exec((err, addresses) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(addresses);
            }
        });
    } else {
        res.status(500).send("Query not found");
    }
}


//TODO: Get Shop by id
exports.getById = (req, res) => {
    Shop.findById(req.params.id).populate("addressId").exec((err, shop) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(shop);
        }
    });
}


//TODO: Create new Supplier
exports.createShop = (req, res) => {
    req.body.type = "shop";
    addressController.createAddress(req, res, address => {
        new Shop({
            name: req.body.name,
            logo: req.body.logo,
            addressId: address._id,
            description: req.body.logo,
            contacts: req.body.contacts,
            workingHours: req.body.workingHours
        }).save((err, shop) => {
            if (err) {
                res.status(500).send(err);
            } else {
                address.shopId = shop._id;
                address.save((err, newAdress) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send({ shop: shop, address: newAdress });
                    }
                });
            }
        })
    });
};


//TODO: Update existing Shop
exports.updateShop = (req, res) => {
    let updates = {};
    if(req.body.name) {
        updates.name = req.body.name;
    }
    if(req.body.logo) {
        updates.logo = req.body.logo;
    }
    if(req.body.description) {
        updates.description = req.body.description;
    }
    if(req.body.contacts) {
        updates.contacts = req.body.contacts;
    }
    if(req.body.workingHours) {
        updates.workingHours = req.body.workingHours;
    }
    Shop.findByIdAndUpdate(req.params.id, updates, { new: true }, (err, shop) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(shop);
        }
    });
};


//TODO: Delete existing Shop
exports.deleteShop = (req, res) => {
    Shop.findByIdAndDelete(req.params.id, {}, (err, shop) => {
        if (err) {
            res.status(500).send(err);
        } else {
            req.addressId = shop.addressId;
            addressController.removeAddress(req, res, address => {
                res.status(200).send({ shop: shop, address: address });
            });
        }
    })
};