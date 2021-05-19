const db = require("../models");
const addressController = require("./address.controller");
const Manufacturer = db.manufacturer;


//TODO: Get all food categories
exports.search = (req, res) => {
    Manufacturer.find({ name: new RegExp(req.query.name, "i")}).populate("addressId").exec((err, manufacturers) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(manufacturers);
        }
    });
}


//TODO: Get all food categories
exports.getById = (req, res) => {
    Manufacturer.findById(req.params.id).populate("addressId").exec((err, manufacturer) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(manufacturer);
        }
    });
}


//TODO: Create new Manufacturer
exports.createManufacturer = (req, res) => {
    req.body.type = "manufacturer";
    req.body.shopId = null;
    addressController.createAddress(req, res, address => {
        new Manufacturer({
            name: req.body.name,
            logo: req.body.logo,
            addressId: address._id,
            description: req.body.logo,
            contacts: req.body.contacts
        }).save((err, manufacturer) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send({ manufacturer: manufacturer, address: address });
            }
        })
    });
};


//TODO: Update existing Manufacturer
exports.updateManufacturer = (req, res) => {
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
    Manufacturer.findByIdAndUpdate(req.params.id, updates, { new: true }, (err, manufacturer) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(manufacturer);
        }
    });
};


//TODO: Delete existing Manufacturer
exports.deleteManufacturer = (req, res) => {
    Manufacturer.findByIdAndDelete(req.params.id, {}, (err, manufacturer) => {
        if (err) {
            res.status(500).send(err);
        } else {
            req.addressId = manufacturer.addressId;
            addressController.removeAddress(req, res, address => {
                res.status(200).send({ manufacturer: manufacturer, address: address });
            });
        }
    })
};