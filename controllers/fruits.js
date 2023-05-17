
const express = require("express");
const router = express.Router();
const Fruit = require("../models/fruits");

// Index : Show all the things!
router.get("/", (req, res) => {
  // /fruits
  Fruit.find({}, (error, allFruits) => {
    res.render("fruits/Index", {
      fruits: allFruits,
    });
  });
});

// New : An empty form for a new thing
// GET /fruits/new
router.get("/new", (req, res) => {
  // /fruits/new
  res.render("../views/fruits/New");
});

// Delete/Destroy : Get rid of this particular thing!
// DELETE /fruits/:id
router.delete("/:id", (req, res) => {
  Fruit.findByIdAndRemove(req.params.id, (err, data) => {
    res.redirect("/fruits"); //redirect back to fruits index
  });
});

// Update : Update this specific thing with this updated form
// PUT /fruits/:id
router.put("/:id", (req, res) => {
  if (req.body.readyToEat === "on") {
    req.body.readyToEat = true;
  } else {
    req.body.readyToEat = false;
  }
  Fruit.findByIdAndUpdate(req.params.id, req.body, (err, updatedFruit) => {
    console.log(updatedFruit);
    res.redirect(`/fruits/${req.params.id}`);
  });
});

// Create : Make a new thing with this filled out form
//POST /fruits
router.post("/", async (req, res) => {
  if (req.body.readyToEat === "on") {
    //if checked, req.body.readyToEat is set to 'on'
    req.body.readyToEat = true; //do some data correction
  } else {
    //if not checked, req.body.readyToEat is undefined
    req.body.readyToEat = false; //do some data correction
  }
  // fruits.push(req.body) // pushing new fruit into fruits array
  await Fruit.create(req.body, (error, createdFruit) => {
    res.redirect("/fruits");
  });

  // res.redirect('/fruits'); //send the user back to /fruits
});

// Edit : A prefilled form to update a specific thing
// GET /fruits/:id/edit
router.get("/:id/edit", (req, res) => {
  Fruit.findById(req.params.id, (err, foundFruit) => {
    //find the fruit
    if (!err) {
      res.render("fruits/Edit", {
        fruit: foundFruit, //pass in the found fruit so we can prefill the form
      });
    } else {
      res.send({ msg: err.message });
    }
  });
});

// Show : Show me this one thing by ID
// GET /fruits/:id
router.get("/:id", (req, res) => {
  Fruit.findById(req.params.id, (err, foundFruit) => {
    res.render("fruits/Show", {
      fruit: foundFruit,
    });
  });
});

module.exports = router;
