const db = require("../models");
const mongoose = require("mongoose");
const { recipe } = require("../models");
const MasterClass = db.masterClass;
const Consulting = db.consulting;
const MasterClassMember = db.masterClassMember;


//TODO: Get master class by date, name, recipe, author
exports.search = (req, res) => {
    if(req.query.date) {

    } else if(req.query.author) {
        const query = {
            authorId: req.query.author
        }
        if(req.query.name) {
            query.name = new RegExp(req.query.name, "i")
        }
        MasterClass.find(query).populate("recipeId").exec((err, lessons) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(lessons);
            }
        })
    } else if(req.query.name) {
        MasterClass.find({ name: new RegExp(req.query.name, "i") }).populate("authorId").populate("recipeId").exec((err, lessons) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(lessons);
            }
        })
    } else {
        res.status(500).send("Запрос не найден");
    }
};


//TODO: Create master class
exports.createMasterClass = (req, res) => {
    new MasterClass({
        ...req.body,
        authorId: req.chef._id,
        recipeId: mongoose.Types.ObjectId(req.body.recipeId)
    }).save((err, lesson) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(lesson);
        }
    })
}

//TODO: Update master class
exports.updateMasterClass = (req, res) => {
    MasterClass.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, lesson) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(lesson);
        }
    })
}

//TODO: Delete master class
exports.deleteMasterClass = (req, res) => {
    MasterClass.findByIdAndDelete(req.params.id, {}, (err, lesson) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(lesson);
        }
    })
}

//TODO: Get master class by id
exports.getById = (req, res) => {
    MasterClass.findById(req.params.id).populate("recipeId").populate("authorId").exec((err, lesson) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(lesson);
        }
    })
}

//TODO: Join master class
exports.joinMasterClass = (req, res) => {
    new MasterClassMember({
        memberId: mongoose.Types.ObjectId(req.userId),
        masterClassId: mongoose.Types.ObjectId(req.params.id)
    }).save((err, member) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(member);
        }
    })
}

//TODO: Leave master class
exports.leaveMasterClass = (req, res) => {
    MasterClassMember.findByIdAndDelete(req.params.memberId, {}, (err, member) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(member);
        }
    })
}

//TODO: Get my masterClasses
exports.getMine = (req, res) => {
    MasterClassMember.find({ memberId: req.userId }).populate("masterClassId").exec((err, members) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(members);
        }
    })
}

//TODO: Request a consulting
exports.requestConsulting = (req, res) => {
    new Consulting({
        date: req.body.date,
        authorId: mongoose.Types.ObjectId(req.userId),
        recipeId: mongoose.Types.ObjectId(req.body.recipeId),
    }).save((err, consulting) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(consulting);
        }
    })
}

//TODO: Respond to a consulting
exports.respondConsulting = (req, res) => {
    Consulting.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, consulting) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(consulting);
        }
    });
}

//TODO: Cancel a consulting
exports.cancelConsulting = (req, res) => {
    Consulting.findByIdAndUpdate(req.params.id, {  status: "cancelled" }, { new: true }, (err, consulting) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(consulting);
        }
    });
}