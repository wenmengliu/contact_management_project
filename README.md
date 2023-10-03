# contact_managment_project

## Backend

### Tech Stacks:

Build RESTful APIs Using Node, Express, and MongoDB

### How to run

Run `yarn run dev` if you start locally after setting up MongoDB server on the local

### Implemented 4 endpoints

After running `yarn run dev` locally, you can test the endpoint in the postman. The project structure follows on the MVC structure.

- Fetch the GET partner data: `localhost:3000/api/` using **GET** http method;
- Create the contact: `localhost:3000/api/create-contact` using **POST** http method;
- Apply the JWT authentication: `localhost:3000/api/login` using **POST** http method. The given sample user is hard-coded in the `server/config/jwt.js`. The sample user is
```
  {
  "username": "wenmeng",
  "password": "helloWorld"
}
```
- Edit the contact based on the id which is an unique key in the `server/models/contactModel.js` : `localhost:3000/api/update-contact/:id` using **PUT** http method;

## Frontend

### Tech Stacks: React

### How to run
After starting the server, please use `yarn start` to start. 

### Functionalities

- User case 1: As an un-authenticated public user, I want to view all the existing contacts for the company.
- User case 2: Search functionality, as an un-authenticated public user, I want to filter the contacts whose name contains what I type!
- User case 3 (partially): create a "Create" button that navigates to "create-page" for creating a new contact and could also successfully navigate to the root path. Has not completed updating the table on the root path (home page)
- User case 4 (partially): create a "Login" button that could successfully authenticate given by the sample user. If the user is not authorized, it will throw an error. The sample user input is
```
  {
  "email": "crliu@example.com",
  "password": "helloWorld"
}
```
### Demo
Here is the recording demo when running this project locally. 



