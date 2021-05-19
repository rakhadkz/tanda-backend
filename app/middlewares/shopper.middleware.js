const db = require("../models");
const Shopper = db.shopper;


isShopper = (req, res, next) => {
    Shopper.findById(req.userId, (err, shopper) => {
        if(err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else if(!shopper) {
            res.status(401).send({ message: "Действие запрещено!" });
        } else {
            req.shopper = shopper;
            next();
        }
    });
};


exists = (req, res, next) => {
    Shopper.findOne({ phone: req.body.phone }, (err, shopper) => {
        if(err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else if(!shopper) {
            next();
        } else {
            res.status(401).send({ message: "Аккаунт с этим номером уже существует!" });
        }
    });
};


module.exports = { isShopper, exists };