const mongoose = require("mongoose");

//define schema
const BlogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    descripition: {
      type: String,
      required: true,
    },
    image: {
      public_id: {
        type: String,
        Required: true,
      },
      url: {
        type: String,
        Required: true,
      },
    },
  },
  { timestamps: true }
);

//create collection
const BlogModel = mongoose.model("blog", BlogSchema); //blog is the name of collection
module.exports = BlogModel;

