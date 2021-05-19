const { SECRET_KEY, ADMIN_TOKEN } = process.env;
const jwt = require("jsonwebtoken");
const db = require("../models");
const User = db.user;

verifyToken = (req, res, next) => {
  let token = req.headers["tannda-access-token"];

  if (!token) {
    return res.status(401).send({ message: "Токен не найден!" });
  } else {
    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: "Действие запрещено!" });
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};


isUser = (req, res, next) => {
  User.findById(req.userId, (err, user) => {
    if(err) {
      res.status(401).send({ message: "Возникла ошибка. Попробуйте еще раз" });
    } else if(!user) {
      res.status(401).send({ message: "Действие запрещено!" });
    } else {
      req.user = user;
      next();
    }
  });
};


isAdmin = (req, res, next) => {
  let token = req.headers["tannda-access-token"];

  if (!token) {
      return res.status(401).send({ message: "Токен не найден!" });
  } else if(token === ADMIN_TOKEN) {
      next();
  } else {
      return res.status(401).send({ message: "Действие запрещено!" });
  }
};




const authJwt = {
  verifyToken,
  isUser, 
  isAdmin
};
module.exports = authJwt;
