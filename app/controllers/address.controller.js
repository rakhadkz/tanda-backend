const db = require("../models");
const mongoose = require("mongoose");
const Address = db.address;


//TODO: Create new Address
exports.createAddress= (req, res, callback) => {
    new Address({
        city: req.body.city,
        street: req.body.street,
        zipCode: req.body.zipCode,
        location: {
            type: "Point",
            coordinates: [req.body.coordinates]
        },
        originId: mongoose.Types.ObjectId(req.body.shopId)
    }).save((err, address) => {
        if (err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else {
            callback(address);
        }
    });
};


//TODO: Remove existing Address
exports.removeAddress = (req, res, callback) => {
    Address.findByIdAndDelete(req.addressId, {}, (err, address) => {
        if (err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else {
            callback(address)
        }
    })
};


//TODO: Delete existing Address
exports.deleteAddress = (req, res) => {
    Address.findByIdAndDelete(req.params.id, {}, (err, address) => {
        if (err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else {
            res.status(200).send(address);
        }
    })
};