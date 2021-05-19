const { shopper, chef, auth } = require("../middlewares");
const controller = require("../controllers/foodOrder.controller");


module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "tannda-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //TODO: Get my orders
    app.get("/api/order/food/current", controller.getMyOrders);

    //TODO: Get requested orders
    app.get("/api/order/food/requested", controller.getRequested);

    //TODO: Get orders history
    app.get("/api/order/food/history", controller.getOrderHistory);

    //TODO: Get by id
    app.get("/api/order/food/:id", controller.getById);

    //TODO: Create order
    app.post("/api/order/food", controller.createOrder);

    //TODO: Update order
    app.put("/api/order/food/:id", controller.updateOrder);

};
