const db = require("../models");
const CollectionMember = db.collectionMember;
const Collection = db.collection;


isAuthor = (req, res, next) => {
    CollectionMember.findOne({ member: req.userId, collectionId: req.params.id }, (err, member) => {
        if (err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else if(member && member.role === "author" && member.state === "verified"){
            req.collectionAuthor = member;
            next();
        } else {
            res.status(401).send({ message: "Вы не являетесь участником"});
        }
    })
};


isMember = (req, res, next) => {
    CollectionMember.findOne({ member: req.userId, collectionId: req.params.id }, (err, member) => {
        if (err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else if(member && member.state === "verified"){
            req.collectionMember = member;
            next();
        } else {
            res.status(401).send({ message: "Вы не являетесь участником" });
        }
    })
};


isRequested = (req, res, next) => {
    CollectionMember.findOne({ member: req.userId, collectionId: req.params.id }, (err, member) => {
        if (err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else if(member){
            req.collectionRequested = member;
            next();
        } else {
            res.status(401).send({ message: "Вы не являетесь участником" });
        }
    })
};


isPublicOrMember = (req, res, next) => {
    CollectionMember.findOne({ member: req.userId, collectionId: req.params.id }, (err, member) => {
        if (err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else if(member){
            req.collectionRequested = member;
            next();
        } else {
            Collection.findById(req.params.id, (err, collection) => {
                if (err) {
                    res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
                } else if(!collection || collection.public !== true) {
                    res.status(401).send({ message: "Вы не являетесь участником" });
                } else {
                    req.collection = collection;
                    next();
                }
            });
        }
    })
};

module.exports = { isAuthor, isMember, isRequested, isPublicOrMember };