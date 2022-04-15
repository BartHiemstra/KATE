const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const buildingsRouter = require('./routes/buildings');
const materialsRouter = require('./routes/materials');
//TODO: Merge calculationRouter with BuildingsRouter.
const calculationRouter = require('./routes/calculation');

// Get the assigned server port and mongoDB URI from the environment file.
require('dotenv').config();
const port = process.env.PORT;
const uri = process.env.URI;

// Specify the use of CORS, Express and the API routes.
app.use(cors());
app.use(express.json());

//TODO: Merge CalculationRouter with BuildingsRouter.
app.use('/buildings', buildingsRouter);
app.use('/materials', materialsRouter);
app.use('/calculation', calculationRouter);

// Connect to local MongoDB database through specified URI.
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Start listening for requests on specified port.
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});