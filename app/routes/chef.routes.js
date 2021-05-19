const { chef, auth } = require("../middlewares");
const controller = require("../controllers/chef.controller");


module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "tannda-access-token, Origin, Content-Type, Accept"
        );
        next();
    });


    //TODO: Login existing chef
    app.post("/api/chef/login", controller.login);


    //TODO: Register new chef
    app.post("/api/chef/register", [auth.verifyToken, chef.exists], controller.register);


    //TODO: Verify phone number
    app.post("/api/chef/verify", controller.confirmCode);

    
    //TODO: Get chefs by query params
    app.get("/api/chef/search", controller.getByQuery);


    //TODO: Get chef by id
    app.get("/api/chef/:id", controller.getById);


    //TODO: Get chef reviews
    app.get("/api/chef/:id/reviews", controller.getReviews);

    
    //TODO: Update chef
    app.put("/api/chef/:id", [auth.verifyToken], controller.update);


    //TODO: Delete chef
    app.delete("/api/chef/:id", [auth.verifyToken], controller.delete);


    //TODO: Send legal documents
    app.post("/api/chef/:id/status/request", [auth.verifyToken], controller.sendLegalDocument);


    //TODO: Update status of the chef
    app.put("/api/chef/:id/status/respond", [auth.isAdmin], controller.updateStatus);


    //TODO: Add new review
    app.post("/api/chef/:id/reviews", [auth.verifyToken, auth.isUser], controller.addReview);

};
