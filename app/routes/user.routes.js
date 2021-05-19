const { auth } = require("../middlewares");
const controller = require("../controllers/user.controller");
const multer = require("multer");
const storage = multer.diskStorage({
  filename: function(req, file, cb) {
    cb(null, file.originalname + '-' + Date.now())
  }
});
const upload = multer({ storage });


module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "tannda-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  //TODO: Send code to phone number
  app.post("/api/user/send", controller.sendMessage);


  //TODO: Verify phone number
  app.post("/api/user/verify", controller.confirmCode);


  //TODO: Get users by query params
  app.get("/api/user/find",  controller.getByQuery);


  //TODO: Get user by id
  app.get("/api/user/:id", controller.getById);


  //TODO: Update user
  app.put("/api/user/:id", [ auth.verifyToken, auth.isUser ], controller.update);


  //TODO: Delete user
  app.delete("/api/user/:id", [ auth.verifyToken, auth.isUser ], controller.delete);


  //TODO: Send legal documents
  app.post("/api/user/:id/status/request", [ auth.verifyToken, auth.isUser ], controller.sendLegalDocument);


  //TODO: Approve legal documents
  app.put("/api/user/:id/status/respond", [ auth.isAdmin ], controller.updateStatus);


  //TODO: Add new review
  app.post("/api/user/:id/reviews", [auth.verifyToken], controller.addReview);
};
