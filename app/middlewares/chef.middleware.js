const db = require("../models");
const Chef = db.chef;


isChef = (req, res, next) => {
    Chef.findById(req.userId, (err, chef) => {
        if(err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else if(!chef) {
            res.status(401).send({ message: "Действие запрещено!" });
        } else {
            req.chef = chef;
            next();
        }
    });
};


exists = (req, res, next) => {
    Chef.findOne({ phone: req.body.phone }, (err, chef) => {
        if(err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else if(!chef) {
            next();
        } else {
            res.status(401).send({ message: "Аккаунт с этим номером уже существует!" });
        }
    });
};


module.exports = { isChef, isAdmin, exists };