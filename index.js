const serverless = require("serverless-http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { Food, User } = require("./mongo");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// * GET ALL ITEMS
app.get("/food", (req, res, next) => {
  Food.find({}).then((data) => {
    return res.status(200).json({
      message: "You got all items",
      data: data,
    });
  });
});

// * GREATE A NEW ITEM
app.post("/food", (req, res, next) => {
  let newItem = {
    name: req.body.name,
    description: req.body.description,
  };

  if (!newItem.name || !newItem.description) {
    return res.status(400).json({
      message: "You need to send name and description",
    });
  }

  Food.create(newItem).then((data) => {
    return res.status(200).json({
      message: "You created a new item",
      data: data,
    });
  });
});

// * UPDATE AN ITEM
app.put("/food/:id", (req, res, next) => {
  let updatedItem = {
    name: req.body.name,
    description: req.body.description,
  };

  Food.findByIdAndUpdate(req.params.id, updatedItem, { new: true }).then(
    (data) => {
      return res.status(200).json({
        message: "You updated an item",
        data: data,
      });
    }
  );
});

// * DELETE AN ITEM
app.delete("/food/:id", (req, res, next) => {
  Food.findByIdAndDelete(req.params.id).then((data) => {
    return res.status(200).json({
      message: "You deleted an item",
      data: data,
    });
  });
});

// * GREATE A NEW USER
app.post("/user", async (req, res, next) => {
  try {
    const result = await User.create({
      name: req.body.name,
      favoriteFood: req.body.favoriteFood,
    });
    return res.status(200).json({
      message: "You created a new user",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      message: err,
    });
  }
});

// * GET A SINGLE USER
app.get("/user/:id", async (req, res) => {
  try {
    const result = await User.findById(req.params.id)
      // TODO: Populate is not behaving as expected...
      .populate("favoriteFood")
      .exec();

    return res.status(200).json({
      message: "Get a single user with favorite food",
      data: result,
    });
  } catch (err) {
    return res.status(400).json({
      message: err,
    });
  }
});

// * ERROR HANDLING
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
