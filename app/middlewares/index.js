const auth = require("./auth.middleware");
const shopper = require("./shopper.middleware");
const chef = require("./chef.middleware");
const collection = require("./collection.middleware");
const lesson = require("./lesson.middleware");

module.exports = {
  auth,
  shopper,
  collection,
  chef,
  lesson
};
