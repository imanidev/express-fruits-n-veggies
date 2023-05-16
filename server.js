// Add dotenv
require("dotenv").config();

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
// Index : Show all the things!
app.get("/fruits", async (req, res) => {
  try {
    const allFruits = await Fruit.find({});
    res.render("fruits/Index", {
      fruits: allFruits,
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/vegetables/", (req, res) => {
  res.render("../views/vegetables/Index", { veg: vegetables });
});

// New : An empty form for a new thing
// GET /fruits/new
app.get("/fruits/new", (req, res) => {
  res.render("../views/fruits/New");
});
app.get("/vegetables/new", (req, res) => {
  res.render("../views/vegetables/New");
});

// Delete/Destroy : Get rid of this particular thing!
// DELETE /fruits/:id

app.delete("/fruits/:id", async (req, res) => {
  try {
    await Fruit.findByIdAndRemove(req.params.id);
    res.redirect("/fruits");
  } catch (error) {
    console.error(error);
  }
});

// Update : Update this specific thing with this updated form
// PUT /fruits/:id

app.put("/fruits/:id", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      req.body.readyToEat = true;
    } else {
      req.body.readyToEat = false;
    }
    const updatedFruit = await Fruit.findByIdAndUpdate(req.params.id, req.body);
    console.log(updatedFruit);
    res.redirect(`/fruits/${req.params.id}`);
  } catch (error) {
    console.error(error);
  }
});

// Create : Make a new thing with this filled out form
//POST /fruits

app.post("/fruits", async (req, res) => {
  try {
    if (req.body.readyToEat === "on") {
      req.body.readyToEat = true;
    } else {
      req.body.readyToEat = false;
    }
    await Fruit.create(req.body);
    res.redirect("/fruits");
  } catch (error) {
    console.error(error);
  }
});

app.post("/vegetables", (req, res) => {
  if (req.body.readyToEat === "on") {
    //if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true; //do some data correction
  } else {
    //if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false; //do some data correction
  }
  vegetables.push(req.body); // pushing new vegetable into vegetables array
  console.log(vegetables); // so we can see vegetables, including new vegetable
  res.redirect("/vegetables"); //send the user back to /vegetables
});

// Edit : A prefilled form to update a specific thing
// GET /fruits/:id/edit

app.get("/fruits/:id/edit", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    res.render("fruits/Edit", {
      fruit: foundFruit,
    });
  } catch (err) {
    res.send({ msg: err.message });
  }
});

// Show : Show me this one thing by ID
// GET /fruits/:id
app.get("/fruits/:id", async (req, res) => {
  try {
    const foundFruit = await Fruit.findById(req.params.id);
    res.render("fruits/Show", {
      fruit: foundFruit,
    });
  } catch (error) {
    console.error(error);
  }
});

app.get("/vegetables/:indexOfVegArray", (req, res) => {
  res.render("../views/vegetables/Show", {
    // second param must be an object
    veg: vegetables[req.params.indexOfVegArray],
  });
});

// Listen...
app.listen(port, () => {
  console.log(`running on port ${port}`);
});
