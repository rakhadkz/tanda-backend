const { SECRET_KEY, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, VERIFICATION_SID } = process.env;
const mongoose = require("mongoose");
const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const jwt = require("jsonwebtoken");
const db = require("../models");
const Review = db.review;
const Shopper = db.shopper;
const LegalDocument = db.legalDocument;



//TODO: Send verification message
exports.login = (req, res) => {
    const { phone } = req.body;
    if(phone && phone.length === 10) {
        Shopper.findOne({ phone: phone }, (err, shopper) => {
            if(err) {
                res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
            } else if(!shopper) {
                res.status(401).send({ message: "Аккаунт не найден" });
            } else {ы
                twilio.verify.services(VERIFICATION_SID).verifications.create({
                    to: `+7${phone}`, channel: 'sms'
                }).then(verification => {
                    res.status(200).send({ message: "Код отправлен на ваш номер" });
                }).catch(err => {
                    res.status(500).send({ message: "Не удалось оправить сообщение" });
                });
            }
        });
    } else {
        res.status(404).send("Неправильный формат номера");
    }
}



//TODO: Confirm code
exports.confirmCode = (req, res) => {
    const { phone, code } = req.body;
    if(phone && phone.length === 10 && code && code.length === 6) {
        twilio.verify.services(VERIFICATION_SID).verificationChecks.create({ 
            code: code, to: `+7${phone}`
        }).then(verification => {
            if(verification.status === "approved") {
                Shopper.findOne({ phone: phone }, (err, shopper) => {
                    if(err) {
                        res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
                    } else if(shopper) {
                        const token = jwt.sign({ id: shopper._id }, SECRET_KEY, { expiresIn: 86400 });
                        res.status(200).send({
                            ...shopper,
                            token: token
                        });
                    } else {
                        res.status(401).send({ message: "Аккаунт не найден" });
                    }
                });
            } else {
                res.status(404).send({ message: "Неправильный код" });
            }
        }).catch(err => {
            res.status(500).send({ message: "Не удалось подтвердить номер" });
        });
    } else {
        res.status(404).send("Неправильный формат номера или кода");
    }
}


//TODO: Register user
exports.register = (req, res) => {
    new Shopper({
        name: req.body.name,
        phone: req.body.phone,
        image: req.body.image,
        city: req.body.city 
    }).save((err, shopper) => {
        if(err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else {
            twilio.verify.services(VERIFICATION_SID).verifications.create({
                to: `+7${req.body.phone}`, channel: 'sms'
            }).then(verification => {
                res.status(200).send(shopper);
            }).catch(err => {
                res.status(500).send({ message: "Не удалось оправить сообщение" });
            });
        }
    });
}


//TODO: Get chef info
exports.getById = (req, res) => {
    Shopper.findById(req.params.id, (err, shopper) => {
        if(err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else {
            res.status(200).send(shopper);
        }
    });
}


//TODO: Get chefs by queries
exports.getByQuery = (req, res) => {
    if(req.query.name) {
        Shopper.find({ name: new RegExp(req.query.name, "i")}, (err, shoppers) => {
            if(err) {
                res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
            } else {
                res.status(200).send(shoppers);
            }
        })
    } else if(req.query.latest) {
        Shopper.find().sort("-avgRating").limit(10).exec((err, shoppers) => {
            if(err) {
                res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
            } else {
                res.status(200).send(shoppers);
            }
        });
    } else {
        res.status(404).send({ message: "Запрос не найден" });
    }
}


//TODO: Update chef info
exports.update = (req, res) => {
    const updates = {};
    if(req.body.name) {
        updates.name = req.body.name;
    }
    if(req.body.image) {
        updates.image = req.body.image;
    }
    if(req.body.city) {
        updates.city = req.body.city;
    }
    if(req.body.about) {
        updates.about = req.body.about;
    }
    if(req.body.workingDays) {
        updates.workingHours = req.body.workingHours;
    }
    Shopper.findByIdAndUpdate(req.userId, updates, { new: true }, (err, shopper) => {
        if(err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else {
            res.status(200).send(shopper);
        }
    })
}


//TODO: Delete chef
exports.delete = (req, res) => {
    Shopper.findByIdAndDelete(req.userId, {}, (err, shopper) => {
        if(err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else {
            res.status(200).send(shopper);
        }
    })
}


//TODO: Send legal documents
exports.sendLegalDocument = (req, res) => {
    if(req.body.documents && req.body.documents.length > 5) {
        new LegalDocument({ author: mongoose.Types.ObjectId(req.userId), documents: req.body.documents }).save((err, legalDocument) => {
            if(err) {
                res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
            } else {
                res.status(200).send(legalDocument);
            }
        });
    } else {
        res.status(404).send({ message: "Неправильный формат документов" });
    }
}


//TODO: Change status of chef
exports.approve = (req, res) => {
    Shopper.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }, (err, shopper) => {
        if(err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else {
            res.status(200).send(shopper);
        }
    });
}


//TODO: Add new review
exports.addReview = (req, res) => {
    Review.findOne({ receiverId: req.params.id, authorId: req.userId}, (err, review) => {
        if(err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else {
            const oldRating = review.rating;
            review  = {
                ...review,
                receiverId: mongoose.Types.ObjectId(req.params.id),
                authorId: req.user._id,
                rating: req.body.rating,
                images: req.body.images,
                body: req.body.body
            }
            review.save((err, review) => {
                if(err) {
                    res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
                } else {
                    Chef.findById(req.params.id, (err, shopper) => {
                        if(err) {
                            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
                        } else if (shopper) {
                            shopper.rating[review.rating - 1]++;
                            if(oldRating) {
                                shopper.rating[oldRating - 1]--;
                            }
                            let sum = 0;
                            let count = 0;
                            for(let i=0;i<4;i++) {
                                count += shopper.rating[i];
                                sum += shopper.rating[i]*(i+1);
                            }
                            shopper.avgRating = sum/count;
                            shopper.save((err, shopper) => {
                                if(err) {
                                    res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
                                } else {
                                    res.status(200).send({ shopper: shopper, review: review });
                                }
                            })
                        } else {
                            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
                        }
                    });
                }
            })
        }
    })
}



//TODO: Get reviews
exports.getReviews = (req, res) => {
    Review.find({ receiverId: req.params.id }).populate({ path: "authorId", model: User }).exec((err, reviews) => {
        if(err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
        } else {
            res.status(200).send(reviews);
        }
    });
}

