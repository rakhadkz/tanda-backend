const { chef, auth, lesson } = require("../middlewares");
const controller = require("../controllers/lesson.controller");


module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "tannda-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //TODO: Get master class by date, name, recipe, author
    app.get("/api/lesson/master/search", controller.search);


    //TODO: Create master class
    app.post("/api/lesson/master", [auth.verifyToken, chef.isChef], controller.createMasterClass);


    //TODO: Update master class
    app.put("/api/lesson/master/:id", [auth.verifyToken, chef.isChef], controller.updateMasterClass);

    
    //TODO: Update master class
    app.delete("/api/lesson/master/:id", [auth.verifyToken, chef.isChef], controller.deleteMasterClass);


    //TODO: Get master class by id
    app.get("/api/lesson/master/:id", controller.getById);


    //TODO: Join master class
    app.post("/api/lesson/master/:id/members", [auth.verifyToken, auth.isUser], controller.joinMasterClass);


    //TODO: Leave master class
    app.delete("/api/lesson/master/:id/members/", [auth.verifyToken, lesson.isMember], controller.leaveMasterClass);


    //TODO: Request a consulting
    app.post("/api/lesson/consulting/:id", [auth.verifyToken, auth.isUser], controller.requestConsulting);


    //TODO: Respond to a consulting
    app.put("/api/lesson/consulting/:id", [auth.verifyToken], controller.respondConsulting);


    //TODO: Cancel a consulting
    app.delete("/api/lesson/consulting/:id", [auth.verifyToken], controller.cancelConsulting);
    
};
