const axios = require("axios");
const Contact = require("../models/contactModel");
const auth = require("../middleware/auth");

const PARTNER_API_ENDPOINT = "https://jsonplaceholder.typicode.com/users";
let partnerDataSaved = 0; // Initialize the variable to 0

// fetchContact
const fetchContact = async (req, res) => {
  try {
    // Make an HTTP GET request to the partner API
    const response = await axios.get(PARTNER_API_ENDPOINT);

    // Extract the data from the response
    const partnerData = response.data;

    // initally loading partner API into DB -- only save once
    if (partnerDataSaved === 0) {
      for (const data of partnerData) {
        const newContact = new Contact({ ...data });
      }
      //update partnerDataSaved to 1
      partnerDataSaved = 1;
      console.log("Successfully loading partner api into the DB");
    } else {
      console.log("Partner data already loaded into the DB ");
    }

    // Send the partner data as a JSON response
    res.status(200).json(partnerData);
  } catch (error) {
    console.error("Error fetching data from the partner API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// create contact given an unauthorizated user
const createContact = async (req, res) => {
  try {
    const requestData = req.body;
    // Find the contact with the highest ID (assumes ID is a numeric field)
    const latestContact = await Contact.findOne().sort({ id: -1 });

    // Calculate the new ID based on the latest contact's ID
    const newId = latestContact ? latestContact.id + 1 : 10;

    // Create a new contact
    const newContact = new Contact({
      id: newId,
      ...requestData,
    });

    // Save the new contact to the database
    await newContact.save();

    // Send a success response
    res.status(201).json({
      status: "success",
      message: "Contact created successfully",
      data: newContact, // Include the created contact in the response});
    });
  } catch (error) {
    console.error("Error creating a new contact:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateContact = async (req, res) => {
  const contactId = req.params.id;
  const updatedContactData = req.body;

  try {
    const updatedContact = await Contact.findOneAndUpdate(
      { id: Number(contactId) }, // Filter by id
      updatedContactData,
      { new: true } // Return the updated contact
    );

    if (!updatedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    // Return the updated contact data in the response
    res.status(200).json({
      status: "success",
      message: "Successfully updated contact",
      data: updatedContact,
    });
  } catch (error) {
    console.error("Error updating contact:", error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  fetchContact,
  createContact,
  // Apply the auth middleware to the updateContact function
  updateContact: [auth, updateContact],
};
