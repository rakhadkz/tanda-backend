const { SECRET_KEY, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, VERIFICATION_SID } = process.env;
const db = require("../models");
const twilio = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary");
const User = db.user;
const LegalDocument = db.legalDocument;
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});



//TODO: Send verification message
exports.sendMessage = (req, res) => {
  const { phone } = req.body;
  if(phone && phone.length === 10) {
    twilio.verify.services(VERIFICATION_SID).verifications.create({
      to: `+7${phone}`, channel: 'sms'
    }).then(verification => {
      res.status(200).send({ message: "Код отправлен на ваш номер" });
    }).catch(err => {
      res.status(500).send({ message: "Не удалось оправить сообщение" });
    })
  } else {
    res.status(404).send("Неправильный формат номера");
  }
}


//TODO: Login user or create user
exports.confirmCode = (req, res) => {
  const { phone, code } = req.body;
  if(phone && phone.length === 10 && code && code.length === 6) {
    twilio.verify.services(VERIFICATION_SID).verificationChecks.create({ 
      code: code, to: `+7${phone}`
    }).then(verification => {
      if(verification.status === "approved") {
        User.findOne({ phone: phone }, (err, user) => {
          if(err) {
            res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
          } else if(user) {
            const token = jwt.sign({ id: user._id }, SECRET_KEY, {  expiresIn: 86400  });
            res.status(200).send({
              ...user._doc,
              token: token
            });
          } else {
            new User({ phone: phone }).save((err, newUser) => {
              if (err) {
                res.status(500).send({message: err});
              } else {
                const token = jwt.sign({ id: newUser._id }, SECRET_KEY, { expiresIn: 86400 });
                res.status(200).send({
                  ...newUser._doc,
                  token: token
                });
              }
            });
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


//TODO: Get user info
exports.getById = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if(err) {
      res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
    } else {
      res.status(200).send(user);
    }
  });
}


//TODO: Get user info by queries
exports.getByQuery = (req, res) => {
  if(Object.keys(req.query).length > 0) {
    let newQuery = req.query;
    if(req.query.name) {
      newQuery.name = new RegExp(req.query.name, "i");
    }

    User.find(newQuery, (err, users) => {
      if(err) {
        res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
      } else {
        res.status(200).send(users);
      }
    })
  } else {
    res.status(404).send({ message: "Запрос не найден" });
  }
}


//TODO: Update user info
exports.update = (req, res) => {
  const updates = {};
  if(req.body.name) {
    updates.name = req.body.name
  }
  if(req.body.image) {
    updates.image = req.body.image
  }
  User.findByIdAndUpdate(req.params.id, updates, { new: true }, (err, newUser) => {
    if(err) {
      res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
    } else {
      res.status(200).send(newUser._doc);
    }
  })
}

//TODO: Update user info
exports.delete = (req, res) => {
  User.findByIdAndDelete(req.params.id, {}, (err, newUser) => {
    if(err) {
      res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
    } else {
      res.status(200).send(newUser._doc);
    }
  })
}


//TODO: Send legal documents
exports.sendLegalDocument = (req, res) => {
  if(req.body.documents && req.body.documents.length <= 5) {
    new LegalDocument({ author: req.userId, type: "user", documents: req.body.documents }).save((err, legalDocument) => {
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


//TODO: Change status of user
exports.updateStatus = (req, res) => {
  User.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true }, (err, user) => {
    if(err) {
      res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
    } else {
      res.status(200).send(user._doc);
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
              authorId: mongoose.Types.ObjectId(req.userId),
              rating: req.body.rating,
              images: req.body.images,
              body: req.body.body
          }
          review.save((err, review) => {
              if(err) {
                  res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
              } else {
                  User.findById(req.params.id, (err, user) => {
                      if(err) {
                          res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
                      } else if (user) {
                        user.rating[review.rating - 1]++;
                        if(oldRating) {
                          user.rating[oldRating - 1]--;
                        }
                        let sum = 0;
                        let count = 0;
                        for(let i=0;i<4;i++) {
                            count += user.rating[i];
                            sum += user.rating[i]*(i+1);
                        }
                        user.avgRating = sum/count;
                        user.save((err, user) => {
                            if(err) {
                                res.status(500).send({ message: "Возникла ошибка. Попробуйте еще раз" });
                            } else {
                                res.status(200).send({ user: user, review: review });
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