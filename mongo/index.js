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


const user = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  favoritefood: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Food",
      required: true
  },
});

const User = mongoose.model("User", user);
const Food = mongoose.model("Food", food);

module.exports = { Food, User };
