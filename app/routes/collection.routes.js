const { auth, collection } = require("../middlewares");
const controller = require("../controllers/collection.controller");


module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "tannda-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //TODO: Create collection
    app.post("/api/collection/", [ auth.verifyToken, auth.isUser ], controller.createCollection);


    //TODO: Update collection
    app.put("/api/collection/:id", [ auth.verifyToken, collection.isMember ], controller.updateCollection);


    //TODO: Get all public collections
    app.get("/api/collection/public", controller.getPublic);


    //TODO: Get my collections
    app.get("/api/collection/", [ auth.verifyToken ], controller.getMine);


    //TODO: Get collection by id
    app.get("/api/collection/:id", [ auth.verifyToken, collection.isPublicOrMember ], controller.getById);


    //TODO: Duplicate the collection
    app.post("/api/collection/:id/duplicate", [ auth.verifyToken, collection.isPublicOrMember ], controller.duplicateCollection);


    //TODO: Get collection members
    app.get("/api/collection/:id/members", [ auth.verifyToken, collection.isMember ], controller.getMembers);


    //TODO: Leave the collection
    app.delete("/api/collection/:id/members/", [ auth.verifyToken, collection.isMember ], controller.leaveCollection);


    //TODO: Add members to collection
    app.post("/api/collection/:id/members/add", [ auth.verifyToken, collection.isMember ], controller.addMembers);


    //TODO: Respond to a invitation
    app.put("/api/collection/:id/members/respond", [ auth.verifyToken ], controller.respondInvitation);


    //TODO: Add new product
    app.post("/api/collection/:id/products", [ auth.verifyToken, collection.isMember  ], controller.addProduct);


    //TODO: Update a product
    app.put("/api/collection/:id/products/:productId", [ auth.verifyToken, collection.isMember ], controller.updateProduct);


    //TODO: Delete a product
    app.delete("/api/collection/:id/products/:productId", [ auth.verifyToken, collection.isMember ], controller.deleteProduct);

};
