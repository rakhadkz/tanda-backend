const { auth,  shopper } = require("../middlewares");
const controller = require("../controllers/product.controller");


module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "tannda-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //TODO: Search product by name
    //TODO: Search product by shop
    //TODO: Search product by category
    app.get("/api/product/search", controller.searchProducts);


    //TODO: Get latest product sets
    //TODO: Get product sets of a shop
    app.get("/api/product/set", controller.searchProductSets);


    //TODO: Get product by id
    app.get("/api/product/:id", controller.getById);
    

    //TODO: Get product set by id
    app.get("/api/product/set/:id", controller.getSetById);


    //TODO: Create product
    app.post("/api/product/", [auth.isAdmin], controller.createProduct);


    //TODO: Update product
    app.put("/api/product/:id", [auth.isAdmin], controller.updateProduct);


    //TODO: Delete product
    app.delete("/api/product/:id", [auth.isAdmin], controller.deleteProduct);


    //TODO: Add product to a shop
    app.post("/api/product/shop/:id", [auth.isAdmin], controller.addToShop);


    //TODO: Remove product from a shop
    app.delete("/api/product/shop/:id", [auth.isAdmin], controller.deleteFromShop);


    //TODO: Create short name
    app.post("/api/product/shortName", [auth.isAdmin], controller.createShortName);

    
    //TODO: Update short name
    app.put("/api/product/shortName/:id", [auth.isAdmin], controller.updateShortName);


    //TODO: Delete short name
    app.delete("/api/product/shortName/:id", [auth.isAdmin], controller.deleteShortName);


    //TODO: Update price
    app.put("/api/product/price/:id", [shopper.isShopper], controller.updateProductPrice);


    //TODO: Delete price
    app.delete("/api/product/price/:id", [auth.isAdmin], controller.deleteProductPrice);


    //TODO: Search categories
    //TODO: Get subcategories
    app.get("/api/product/category/", controller.searchCategories);


    //TODO: Get categories of a shop
    app.get("/api/product/category/shop/:id", controller.getShopCategories);


    //TODO: Create product category
    app.post("/api/product/category", [auth.isAdmin], controller.createProductCategory);


    //TODO: Update product category
    app.put("/api/product/category/:id", [auth.isAdmin], controller.updateProductCategory);

    
    //TODO: Delete product category
    app.delete("/api/product/category/:id", [auth.isAdmin], controller.deleteProductCategory);
};
