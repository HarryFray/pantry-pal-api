const serverless = require("serverless-http");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

// TODO: Connect to MongoDB IN ANOTHER FILE
const mongoose = require("mongoose");

const connectDB = async () => {
  console.log("Connecting to MongoDB...");
  try {
    await mongoose.connect("mongodb://localhost:27017");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

connectDB().then(() => {
  console.log("Connected to MongoDB");
});

const food = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "No Name",
  },
  description: {
    type: String,
    required: true,
    default: "No Description",
  },
});

const Food = mongoose.model("food", food);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// * GET ALL ITEMS
app.get("/", (req, res, next) => {
  Food.find({}).then((data) => {
    return res.status(200).json({
      message: "You got all items",
      data: data,
    });
  });
});

// * GREATE A NEW ITEM
app.post("/", (req, res, next) => {
  let newItem = {
    name: req.body.name,
    description: req.body.description,
  };

  Food.create(newItem).then((data) => {
    return res.status(200).json({
      message: "You created a new item",
      data: data,
    });
  });
});

// * UPDATE AN ITEM
app.put("/:id", (req, res, next) => {
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
app.delete("/:id", (req, res, next) => {
  Food.findByIdAndDelete(req.params.id).then((data) => {
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
