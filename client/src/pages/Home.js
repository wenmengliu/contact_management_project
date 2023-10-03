import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Home = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [isNewContactAdded, setIsNewContactAdded] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:3000/api/`);
        const result = await res.json();
        if (!result.error) {
          setContacts(result.contacts);
          setLoading(false);
        } else {
          console.log(result);
          setLoading(false);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchData(); // Call the fetchData function to load data initially
  }, []);

  useEffect(() => {
    const { state } = location;
    console.log(state);
    if (state && state.newContact && !isNewContactAdded) {
      // Add the new contact to the contacts list
      setContacts((prevContacts) => [...prevContacts, state.newContact]);
      setIsNewContactAdded(true); // Set the flag to true to prevent further updates
    }
  }, [location.state, isNewContactAdded]);

  //TODO
  // useEffect(() => {
  //   !user && navigate("/login", { replace: true });
  // }, [user, navigate]);

  const handleSearchSubmit = (event) => {
    event.preventDefault();

    const newSearchUser = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchInput.toLowerCase())
    );
    console.log(newSearchUser);
    setContacts(newSearchUser);
  };

  return (
    <>
      <div className="table-responsive">
        <h1> Your Contacts</h1>

        <a href="/" className="btn btn-danger my-2">
          Reload Contact
        </a>
        <hr className="my-10" />
        <>
          <form className="d-flex" onSubmit={handleSearchSubmit}>
            <input
              type="text"
              name="searchInput"
              id="searchInput"
              className="form-control my-2"
              placeholder="Search Contact"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type="submit" className="btn btn-info mx-2">
              Search
            </button>
          </form>

          <p>
            Your Total Contacts: <strong>{contacts.length}</strong>
          </p>
          <table className="table table-hover">
            <thead>
              <tr classNmae="table-dark" className="col-md-2">
                <th scope="col">Name</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Address</th>
                <th scope="col">Phone</th>
                <th scope="col">Website</th>
                <th scope="col">Company Name</th>
                <th scope="col">Company Catch Phrase</th>
                <th scope="col">Company Business Strategy</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map((contact) => (
                <tr key={contact.id}>
                  <td>{contact.name}</td>
                  <td>{contact.username}</td>
                  <td>{contact.email}</td>
                  <td>
                    {contact.address.street}, {contact.address.suite},{" "}
                    {contact.address.city}, {contact.address.zipcode}
                  </td>
                  <td>{contact.phone}</td>
                  <td>
                    <a href={contact.website}>{contact.website}</a>
                  </td>
                  <td>{contact.company.name}</td>
                  <td>{contact.company.catchPhrase}</td>
                  <td>{contact.company.bs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      </div>

      {/* Add this console.log statement */}
      {console.log("Current contacts state:", contacts)}
    </>
  );
};

export default Home;
