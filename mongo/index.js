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
  },
  description: {
    type: String,
    required: true,
  },
});

const FoodModel = mongoose.model("food", food);

module.exports = { FoodModel };
