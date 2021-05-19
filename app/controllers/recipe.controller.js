const db = require("../models");
const cloudinary = require("cloudinary");
const { mongoose } = require("../models");
const Recipe = db.recipe;
const Comment = db.comment;
const Like = db.like;
const Saved = db.saved;
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


//TODO: Get latest recipes 
//TODO: Search recipe by name
//TODO: Get recipes of a chef
//TODO: Get recipes by category
exports.searchRecipes = (req, res) => {
    if(req.query.latest) {
        Recipe.find({}).sort("-createdAt").populate("authorId").populate("categoryId").exec((err, recipes) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(recipes);
            }
        });
    } else if (req.query.category){
        const query = {
            categoryId: req.query.category
        }
        if(req.query.name) {
            query.name = new RegExp(req.query.name, "i")   
        }
        Recipe.find(query).populate("authorId").exec((err, recipes) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(recipes);
            }
        });
    } else if (req.query.chef) {
        const query = {
            authorId: req.query.chef
        }
        if(req.query.name) {
            query.name = new RegExp(req.query.name, "i")   
        }
        Recipe.find(query).populate("categoryId").populate("authorId").exec((err, recipes) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(recipes);
            }
        });
    } else if (req.query.name) {
        Recipe.find({ name: new RegExp(req.query.name, "i") }).populate("categoryId").populate("authorId").exec((err, recipes) => {
            if (err) {
                res.status(500).send(err);
            } else {
                res.status(200).send(recipes);
            }
        });
    } else {
        res.status(200).send("Запрос не найден");
    }
    
}

//TODO: Get recipes by id
exports.getById = (req, res) => {
    Recipe.findById(req.params.id).populate("shopId").populate("productPricesId").populate("authorId").populate("authorId").populate("categoryId").exec((err, recipe) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(recipe);
        }
    });
}


//TODO: Get recipes comments
exports.getComments = (req, res) => {
    Comment.findById({ recipeId: req.params.id }).populate("authorId").exec((err, comments) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(comments);
        }
    });
}


//TODO: Is liked
exports.isLiked = (req, res) => {
    Like.findOne({ recipeId: req.params.id, userId: req.query.userId }, (err, like) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(like);
        }
    })
}


//TODO: Is saved
exports.isSaved = (req, res) => {
    Saved.findOne({ recipeId: req.params.id, userId: req.query.userId }, (err, saved) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(saved);
        }
    })
}


//TODO: Save the recipe
exports.saveRecipe = (req, res) => {
    Saved.findOne({ recipeId: req.params.id, userId: req.query.userId }, (err, saved) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if(saved){
                saved.remove((err, saved) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send(saved);
                    }
                });
            } else {
                new Saved({
                    recipeId: mongoose.Types.ObjectId(req.params.id),
                    userId: mongoose.Types.ObjectId(req.query.userId)
                }).save((err, saved) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send(saved);
                    }
                });
            }
        }
    })
}


//TODO: Like the recipe
exports.likeRecipe = (req, res) => {
    Like.findOne({ recipeId: req.params.id, userId: req.query.userId }, (err, like) => {
        if (err) {
            res.status(500).send(err);
        } else {
            if(like){
                like.remove((err, like) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send(like);
                    }
                });
            } else {
                new Like({
                    recipeId: mongoose.Types.ObjectId(req.params.id),
                    userId: mongoose.Types.ObjectId(req.query.userId)
                }).save((err, like) => {
                    if (err) {
                        res.status(500).send(err);
                    } else {
                        res.status(200).send(like);
                    }
                });
            }
        }
    })
}


//TODO: Create comment
exports.createComment = (req, res) => {
    new Comment({
        body: req.body.comment,
        authorId: mongoose.Types.ObjectId(req.userId),
        replyToId: mongoose.Types.ObjectId(req.body.replyToId),
        recipeId: mongoose.Types.ObjectId(req.params.id)
    }).save((err, comment) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(comment);
        }
    })
}


//TODO: Update comment
exports.updateComment = (req, res) => {
    Comment.findByIdAndUpdate(req.params.commentId, {
        body: req.body.comment,
        updatedAt: Date.now()
    }, { new: true }, (err, comment) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(comment);
        }
    });
}

//TODO: Delete comment
exports.deleteComment = (req, res) => {
    Comment.findByIdAndDelete(req.params.commentId, {}, (err, comment) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(comment);
        }
    });
}

//TODO: Create recipe
exports.createRecipe = (req, res) => {
    const recipe = {
        ...req.body,
        authorId: mongoose.Types.ObjectId(req.userId),
        shopId: mongoose.Types.ObjectId(req.body.shopId),
        categoryId: mongoose.Types.ObjectId(req.body.categoryId),
        productPricesId: req.body.productPricesId.map(price => mongoose.Types.ObjectId(price))
    }
    recipe.ingredients = req.body.ingredients.map(ingredient => {
        return {
            name: ingredient.name,
            products: ingredient.products.map(product => {
                return {
                    ...product,
                    shortNameId: mongoose.Types.ObjectId(product.shortNameId),
                    replacementForId: mongoose.Types.ObjectId(product.replacementForId)
                }
            })
        }
    });
    new Recipe(recipe).save((err, comment) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(comment);
        }
    });
}

//TODO: Update recipe
exports.updateRecipe = (req, res) => {
    Recipe.findByIdAndUpdate(req.params.id, recipe, { new: true }, (err, comment) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(comment);
        }
    });
}

//TODO: Delete recipe
exports.deleteRecipe = (req, res) => {
    Recipe.findByIdAndDelete(req.params.id, {}, (err, recipe) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(recipe);
        }
    });
}


//TODO: Create new food category
exports.createFoodCategory = (req, res) => {
    new FoodCategory(req.body).save((err, foodCategory) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(foodCategory);
        }
    });
};

//TODO: Update existing food category
exports.updateFoodCategory = (req, res) => {
    FoodCategory.findByIdAndUpdate(req.params.id, req.body, { new: true }, (err, foodCategory) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(foodCategory);
        }
    });
};


//TODO: Delete existing food category
exports.deleteFoodCategory = (req, res) => {
    FoodCategory.findByIdAndDelete(req.params.id, {}, (err, foodCategory) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.status(200).send(foodCategory);
        }
    })
};
