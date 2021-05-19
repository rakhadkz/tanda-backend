require('dotenv').config({ path: './.env' });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors({ origin: "http://localhost:8081" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


const db = require("./app/models");
db.mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@testing-lblgt.mongodb.net/tanda?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connect to MongoDB.");
}).catch(err => {
    console.error("Connection error", err);
    process.exit();
});



// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Tañda" });
});



// routes
require("./app/routes/chef.routes")(app);
require("./app/routes/collection.routes")(app);
require("./app/routes/foodOrder.routes")(app);
require("./app/routes/lesson.routes")(app);
require("./app/routes/productOrder.routes")(app);
require("./app/routes/product.routes")(app);
require("./app/routes/recipe.routes")(app);
require("./app/routes/shopper.routes")(app);
require("./app/routes/user.routes")(app);


app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}.`);
});