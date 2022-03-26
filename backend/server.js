const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const addressRouter = require('./routes/address');
const app = express();

//Get the assigned server port and uri from the environment file.
require('dotenv').config();
const port = process.env.PORT;
const uri = process.env.URI;

//Specify API routes.
app.use(cors());
app.use(express.json());
app.use('/address', addressRouter);

//Connect to local MongoDB database.
mongoose.connect(uri);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

//Start server.
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});