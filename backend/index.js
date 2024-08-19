require('dotenv').config();
const express = require('express');
const { connect } = require('mongoose');
const { json } = require('body-parser');
const cors = require('cors');
const stateRoutes = require('./routes/stateRoutes'); 

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

app.use(json());

connect(process.env.MONGODB_URI, { 
  
})
  .then(() => {
    console.log('Connected to MongoDB successfully');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error.message);
  });

app.use('/api', stateRoutes);
