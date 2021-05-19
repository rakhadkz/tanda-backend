const db = require("../models");
const addressController = require("./address.controller");
const Supplier = db.supplier;


//TODO: Search Supplier
exports.search = (req, res) => {
    Supplier.find({ name: new RegExp(req.query.name, "i")}, (err, suppliers) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(suppliers);
        }
    });
}


//TODO: Get Supplier by id
exports.getById = (req, res) => {
    Supplier.findById(req.params.id).populate("addressId").exec((err, supplier) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(supplier);
        }
    });
}


//TODO: Create new Supplier
exports.createSupplier = (req, res) => {
    req.body.type = "supplier";
    req.body.shopId = null;
    addressController.createAddress(req, res, address => {
        new Supplier({
            name: req.body.name,
            logo: req.body.logo,
            addressId: address._id,
            description: req.body.logo,
            contacts: req.body.contacts
        }).save((err, supplier) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send({ supplier: supplier, address: address });
            }
        })
    });
};


//TODO: Update existing Supplier
exports.updateSupplier = (req, res) => {
    const updates = {};
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
    Supplier.findByIdAndUpdate(req.params.id, updates, { new: true }, (err, supplier) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(supplier);
        }
    });
};


//TODO: Delete existing Supplier
exports.deleteSupplier = (req, res) => {
    Supplier.findByIdAndDelete(req.params.id, {}, (err, supplier) => {
        if (err) {
            res.status(500).send(err);
        } else {
            req.addressId = supplier.addressId;
            addressController.removeAddress(req, res, address => {
                res.status(200).send({ supplier: supplier, address: address });
            });
        }
    })
};