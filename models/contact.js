const mongoose = require("mongoose");

//define schema
const ContactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      Required: true,
    },
  },

  { timestamps: true }
);

//create collection
const ContactModel = mongoose.model("Contact", ContactSchema); //Contactis the name of collection
module.exports = ContactModel;
