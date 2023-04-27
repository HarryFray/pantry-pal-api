var serverless = require("serverless-http");
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var FoodModel = require("./mongo").FoodModel;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// * GET ALL ITEMS
app.get("/", function (req, res, next) {
    FoodModel.find({}).then(function (data) {
        return res.status(200).json({
            message: "You got all items",
            data: data,
        });
    });
});
// * GREATE A NEW ITEM
app.post("/", function (req, res, next) {
    var newItem = {
        name: req.body.name,
        description: req.body.description,
    };
    if (!newItem.name || !newItem.description) {
        return res.status(400).json({
            message: "You need to send name and description",
        });
    }
    FoodModel.create(newItem).then(function (data) {
        return res.status(200).json({
            message: "You created a new item",
            data: data,
        });
    });
});
// * UPDATE AN ITEM
app.put("/:id", function (req, res, next) {
    var updatedItem = {
        name: req.body.name,
        description: req.body.description,
    };
    FoodModel.findByIdAndUpdate(req.params.id, updatedItem, { new: true }).then(function (data) {
        return res.status(200).json({
            message: "You updated an item",
            data: data,
        });
    });
});
// * DELETE AN ITEM
app.delete("/:id", function (req, res, next) {
    FoodModel.findByIdAndDelete(req.params.id).then(function (data) {
        return res.status(200).json({
            message: "You deleted an item",
            data: data,
        });
    });
});
// * ERROR HANDLING
app.use(function (req, res, next) {
    return res.status(404).json({
        error: "Not Found",
    });
});
module.exports.handler = serverless(app);
//# sourceMappingURL=index.js.map