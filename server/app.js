const express = require("express");
const connectDB = require("./config/db");
const app = express();
const contactRoutes = require("./routes/contactRoutes");

//middlewares
app.use(express.json());

//routes
app.use("/api", contactRoutes);

//server configurations
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  try {
    await connectDB();
    console.log(`server listening on port: ${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
