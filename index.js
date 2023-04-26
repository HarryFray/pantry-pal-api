const serverless = require("serverless-http");
const express = require("express");
const app = express();

let groceryList = [
  { id: 1, name: "apples", description: 3 },
  { id: 2, name: "bananas", description: 2 },
  { id: 3, name: "bread", description: 1 },
  { id: 4, name: "eggs", description: 1 },
  { id: 5, name: "milk", description: 2 },
  { id: 6, name: "chicken", description: 2 },
  { id: 7, name: "rice", description: 1 },
];

// * GET ALL ITEMS
app.get("/", (req, res, next) => {
  return res.status(200).json({
    message: "You got all items",
    data: groceryList,
  });
});

// * GREATE A NEW ITEM
app.post("/", (req, res, next) => {
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({
      error: "You must include a name and description",
    });
  }

  let myNewItem = {
    id: groceryList.length + 1,
    name: req.body.name,
    description: req.body.description,
  };

  groceryList.push(myNewItem);

  return res.status(200).json({
    message: "You created a new item",
    data: groceryList,
  });
});

// * UPDATE AN ITEM
app.put("/:id", (req, res, next) => {
  console.log(req.params.id);
  return res.status(200).json({
    message: `You updated an item with an id of ${req.params.id}`,
    data: groceryList,
  });
});

// * DELETE AN ITEM
app.delete("/:id", (req, res, next) => {
  let newItemsList = groceryList.filter((item) => {
    return item.id != req.params.id;
  });

  groceryList = newItemsList;

  return res.status(200).json({
    message: `You deleted an item with an id of ${req.params.id}`,
    data: groceryList,
  });
});

// * ERROR HANDLING
app.use((req, res, next) => {
  return res.status(404).json({
    error: "Not Foundrr",
  });
});

module.exports.handler = serverless(app);
