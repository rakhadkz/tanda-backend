const { auth, chef } = require("../middlewares");
const controller = require("../controllers/recipe.controller");


module.exports = function(app) {

    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "tannda-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    //TODO: Get latest recipes 
    //TODO: Search recipe by name
    //TODO: Get recipes of a chef
    //TODO: Get recipes by category
    app.get("/api/recipe/search", controller.searchRecipes);


    //TODO: Get recipes by id
    app.get("/api/recipe/:id", controller.getById);


    //TODO: Get recipes comments
    app.get("/api/recipe/:id/comments", controller.getComments);


    //TODO: Is liked
    app.get("/api/recipe/:id/like", [auth.verifyToken], controller.isLiked);


    //TODO: Is saved
    app.get("/api/recipe/:id/save", [auth.verifyToken], controller.isSaved);


    //TODO: Create recipe
    app.post("/api/recipe/", [auth.verifyToken, chef.isChef], controller.createRecipe);


    //TODO: Update recipe
    app.put("/api/recipe/:id", [auth.verifyToken], controller.updateRecipe);


    //TODO: Delete recipe
    app.delete("/api/recipe/:id", [auth.verifyToken], controller.deleteRecipe);


    //TODO: Save/unsave recipe
    app.post("/api/recipe/:id/save", [auth.verifyToken, auth.isUser], controller.saveRecipe);


    //TODO: Like/unlike recipe
    app.post("/api/recipe/:id/like", [auth.verifyToken, auth.isUser], controller.likeRecipe);


    //TODO: Create comment
    app.post("/api/recipe/:id/comments", [auth.verifyToken, auth.isUser], controller.createComment);


    //TODO: Update comment
    app.put("/api/recipe/:id/comments/:commentId", [auth.verifyToken], controller.updateComment);


    //TODO: Delete comment
    app.delete("/api/recipe/:id/comments/:commentId", [auth.verifyToken], controller.deleteComment);


    //TODO: Create food category
    app.post("/api/recipe/category", [auth.isAdmin], controller.createFoodCategory);


    //TODO: Update food category
    app.put("/api/recipe/category/:id", [auth.isAdmin], controller.updateFoodCategory);


    //TODO: Delete food category
    app.delete("/api/recipe/category/:id", [auth.isAdmin], controller.deleteFoodCategory);
    
};
