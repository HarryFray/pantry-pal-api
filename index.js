const serverless = require("serverless-http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const { FoodModel, UserModel } = require("./mongo");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// * GET ALL ITEMS
app.get("/food", (req, res, next) => {
  FoodModel.find({}).then((data) => {
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

  FoodModel.create(newItem).then((data) => {
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

  FoodModel.findByIdAndUpdate(req.params.id, updatedItem, { new: true }).then(
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
  FoodModel.findByIdAndDelete(req.params.id).then((data) => {
    return res.status(200).json({
      message: "You deleted an item",
      data: data,
    });
  });
});

// * ERROR HANDLING
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
