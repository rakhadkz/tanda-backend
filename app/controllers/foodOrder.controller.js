const db = require("../models");
const { shopper, chef, auth } = require("../middlewares");
const cloudinary = require("cloudinary");
const { mongoose } = require("../models");
const Recipe = db.recipe;
const MealOrder = db.mealOrder;


//TODO: Get my orders
exports.getMyOrders = (req, res) => {
    MealOrder.find({ authorId: req.userId, status: { $in: ["new", "current"]}}, (err, orders) => {
        if (err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else {
            res.status(200).send(orders);
        }
    })
}

//TODO: Get requested orders
exports.getRequested = (req, res) => {
    MealOrder.find({ chefId: req.userId }, (err, orders) => {
        if (err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else {
            res.status(200).send(orders);
        }
    })
}

//TODO: Get orders history
exports.getOrderHistory = (req, res) => {
    MealOrder.find({ authorId: req.userId }, (err, orders) => {
        if (err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else {
            res.status(200).send(orders);
        }
    })
}

//TODO: Get by id
exports.getById = (req, res) => {
    MealOrder.findById(req.params.id).populate("destination").populate("origin").populate("mealsId").populate("recipeId").populate("authorId").exec((err, order) => {
        if (err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else {
            res.status(200).send(order);
        }
    })
}

//TODO: Create order
exports.createOrder = (req, res) => {
    new MealOrder({
        authorId: mongoose.Types.ObjectId(req.userId),
        chefId: mongoose.Types.ObjectId(req.body.chefId),
        destinationId: mongoose.Types.ObjectId(req.body.destinationId),
        meals: [mongoose.Types.ObjectId(req.body.mealId)],
        counts: req.body.counts
    }).save((err, order) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(order);
        }
    })
};

//TODO: Update order
exports.updateOrder = (req, res) => {
    if(req.query.add) {
        MealOrder.findById(req.params.id, (err, order) => {
            if (err || !order || order.authorId.equals(req.userId)) {
                res.status(500).send(err);
            } else {
                order.meals = req.body.meals.map(meal => mongoose.Types.ObjectId(meal))
                order.counts = req.body.counts;
                order.save((err, order) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send(order);
                    }
                })
            }
        })
    } else if(req.query.request) {
        MealOrder.findById(req.params.id, (err, order) => {
            if (err || !order || order.authorId.equals(req.userId)) {
                res.status(500).send(err);
            } else {
                order.originId = mongoose.Types.ObjectId(req.body.originId);
                order.deliverAt = req.body.deliverAt;
                order.save((err, order) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send(order);
                    }
                })
            }
        })
    } else if(req.query.respond) {
        MealOrder.findById(req.params.id, (err, order) => {
            if (err || !order || order.authorId.equals(req.userId)) {
                res.status(500).send(err);
            } else {
                order.status = req.body.status;
                order.states.push({
                    date: Date.now(),
                    status: req.body.status
                })
                order.save((err, order) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send(order);
                    }
                })
            }
        })
    } else if(req.query.accept) {
        MealOrder.findById(req.params.id, (err, order) => {
            if (err || !order || order.authorId.equals(req.userId)) {
                res.status(500).send(err);
            } else {
                order.status = "accepted";
                order.shopper = mongoose.Types.ObjectId(req.userId);
                order.states.push({
                    date: Date.now(),
                    status: "accepted"
                })
                order.save((err, order) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send(order);
                    }
                })
            }
        })
    } else if(req.query.status) {
        MealOrder.findById(req.params.id, (err, order) => {
            if (err || !order || order.authorId.equals(req.userId)) {
                res.status(500).send(err);
            } else {
                order.status = req.body.status;
                order.states.push({
                    date: Date.now(),
                    status: req.body.status
                })
                order.save((err, order) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send(order);
                    }
                })
            }
        })
    }
};