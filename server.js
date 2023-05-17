// Add dotenv
require("dotenv").config();

// Load controllers...
const fruitsController = require("./controllers/fruits.js");
// const vegetablesController = require("./controllers/vegetables.js");

// Load express...
const express = require("express");

// Instantiate express...
const app = express();

//Method Override
const methodOverride = require("method-override");

// Other variables...
const port = 3000;

// Mongoose info
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("connected to mongo");
});

// Middleware...
app.use(methodOverride("_method"));

app.use((req, res, next) => {
  next(); // moves to the next middleware
});

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "jsx");
app.engine("jsx", require("jsx-view-engine").createEngine());

// Data...
const Fruit = require("./models/fruits");
const vegetables = require("./models/vegetables");

// Routes...

app.use('/fruits', fruitsController)
// app.use('/vegetables', vegetablesController)


// Listen...
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
