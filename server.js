const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Connect to MongoDB using the connection string from the .env file
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Define a schema for the form data
const formSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  description: String
});

// Create a model from the schema
const Form = mongoose.model('Form', formSchema);

// Route to handle form submissions
app.post('/submit-form', async (req, res) => {
    try {
      const newForm = new Form({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        description: req.body.description
      });
  
      await newForm.save();
    res.send('Form submitted and data saved successfully!');
    } catch (err) {
      res.status(500).send('Error occurred while saving form data.');
      console.error('Error saving form data:', err);
    }
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
