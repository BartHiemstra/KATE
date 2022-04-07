const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const addressRouter = require('./routes/address');
const materialsRouter = require('./routes/materials');
const calculationRouter = require('./routes/calculation');

// Get the assigned server port and mongoDB uri from the environment file.
require('dotenv').config();
const port = process.env.PORT;
const uri = process.env.URI;

// Specify the use of CORS, Express and the API routes.
app.use(cors());
app.use(express.json());
app.use('/address', addressRouter);
app.use('/materials', materialsRouter);
app.use('/calculation', calculationRouter);

// Connect to local MongoDB database through specified uri.
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Start server.
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});