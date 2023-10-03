import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import ToastContext from "../context/ToastContext";

const CreateContact = () => {
  const { toast } = useContext(ToastContext);
  const [contacts, setContacts] = useState([]);

  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
    companyName: "", // Update the field name to match your API
  });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await fetch(`http://localhost:3000/api/create-contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userDetails),
    });
    const result = await res.json();
    if (!result.error) {
      toast.success(`Created [${userDetails.name}] contact`);

      // In CreateContact.js
      console.log("New Contact:", result.data);

      setContacts((prevContacts) => [...prevContacts, result.data]);
      // Redirect back to Home with a callback function as a query parameter
      navigate(`/`, { state: { newContact: result.data } });

      // Clear the form fields after successful submission
      setUserDetails({
        name: "",
        email: "",
        phone: "",
        companyName: "",
      });
    } else {
      toast.error(result.error);
    }
  };

  return (
    <>
      <h2>Create your contact</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nameInput" className="form-label mt-4">
            Name Of Person
          </label>
          <input
            type="text"
            className="form-control"
            id="nameInput"
            name="name"
            value={userDetails.name}
            onChange={handleInputChange}
            placeholder="wenmeng"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="emailInput" className="form-label mt-4">
            Email Of Person
          </label>
          <input
            type="email"
            className="form-control"
            id="emailInput"
            name="email"
            value={userDetails.email}
            onChange={handleInputChange}
            placeholder="crliu@example.com"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="phoneInput" className="form-label mt-4">
            Phone Number Of Person
          </label>
          <input
            type="number"
            className="form-control"
            id="phoneInput"
            name="phone"
            value={userDetails.phone}
            onChange={handleInputChange}
            placeholder="586.493.6943 x140"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="companyNameInput" className="form-label mt-4">
            Company Name Of Person
          </label>
          <input
            type="text"
            className="form-control"
            id="companyNameInput"
            name="companyName"
            value={userDetails.companyName}
            onChange={handleInputChange}
            placeholder="amazon"
            required
          />
        </div>

        <input
          type="submit"
          value="Add Contact"
          className="btn btn-info my-4"
        />
      </form>
    </>
  );
};

export default CreateContact;
