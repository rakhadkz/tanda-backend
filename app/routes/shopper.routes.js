const { shopper, auth } = require("../middlewares");
const controller = require("../controllers/shopper.controller");


module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "tannda-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //TODO: Login existing shopper
    app.post("/api/shopper/login", controller.login);


    //TODO: Register new shopper
    app.post("/api/shopper/register", [auth.verifyToken, shopper.exists], controller.register);


    //TODO: Verify phone number
    app.post("/api/shopper/verify", controller.confirmCode);


    //TODO: Approve shopper
    app.put("/api/shopper/approve", [auth.isAdmin], controller.approve);


    //TODO: Get shopper by id
    app.get("/api/shopper/:id", controller.getById);


    //TODO: Update shooper
    app.put("/api/shopper/:id", [auth.verifyToken, shopper.isShopper], controller.update);


    //TODO: Delete shopper
    app.delete("/api/shopper/:id", [auth.verifyToken, shopper.isShopper], controller.delete);

};
