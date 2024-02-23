const mongoose = require("mongoose");
const Live_URL =
  "mongodb+srv://fardeenkhan1041:fardeenkhan1041@cluster0.opq9dqn.mongodb.net/blog?retryWrites=true&w=majority";

const url = "mongodb://127.0.0.1:27017/blog123";

const connectDB = () => {
  return mongoose
    .connect(Live_URL)
    .then(() => {
      console.log("succesfully");
    })
    .catch((error) => {
      console.log("unsuccesfully");
    });
};
module.exports = connectDB;
