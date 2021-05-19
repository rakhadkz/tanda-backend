const { shopper, chef, auth } = require("../middlewares");
const controller = require("../controllers/productOrder.controller");


module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "tannda-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //TODO: Get my orders
    app.get("/api/order/product/current", [auth.verifyToken], controller.getMyOrders);

    //TODO: Get requested orders
    app.get("/api/order/product/requested", [auth.verifyToken], controller.getRequested);

    //TODO: Get orders history
    app.get("/api/order/product/history", [auth.verifyToken], controller.getOrderHistory);

    //TODO: Get by id
    app.get("/api/order/product/:id", [auth.verifyToken], controller.getById);

    //TODO: Create order
    app.post("/api/order/product", [auth.verifyToken, auth.isUser], controller.createOrder);

    //TODO: Update order
    app.put("/api/order/product/:id", [auth.verifyToken], controller.updateOrder);

};
