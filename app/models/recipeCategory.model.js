const mongoose = require("mongoose");

const RecipeCategory = mongoose.model(
    "RecipeCategory",
    new mongoose.Schema({
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true,
            maxlength: 800
        },
        image: {
            type: String,
            required: true
        },
        count: {
            type: Number,
            default: 0
        }
    })
);

module.exports = RecipeCategory;
