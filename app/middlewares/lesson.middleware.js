const db = require("../models");
const MasterClassMember = db.masterClassMember;


isMember = (req, res, next) => {
    MasterClassMember.findOne({ memberId: req.userId, masterClassId: req.params.id }, (err, member) => {
        if(err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else if(member) {
            req.member = member;
            next();
        } else {
            res.status(401).send({ message: "Аккаунт не найден!" });
        }
    })
};



module.exports = { isMember };