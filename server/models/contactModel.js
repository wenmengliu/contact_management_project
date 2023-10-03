const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema({
  street: String,
  suite: String,
  city: String,
  zipcode: String,
  geo: {
    lat: String,
    lng: String,
  },
});

const companySchema = new mongoose.Schema({
  name: String,
  catchPhrase: String,
  bs: String,
});

const contactSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    index: true,
    unique: true, // Ensure id is unique
  },
  name: String,
  username: String,
  email: String,
  address: addressSchema,
  phone: String,
  website: String,
  company: companySchema,
});

const Contact = mongoose.model("Contact", contactSchema);

module.exports = Contact;
