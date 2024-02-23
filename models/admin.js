const mongoose = require("mongoose");
//define schema
const AdminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    profileimage: {
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
const AdminModel = mongoose.model("admin", AdminSchema); //blog is the name of collection
module.exports = AdminModel;
