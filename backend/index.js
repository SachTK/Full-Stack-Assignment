// const express = require('express');
// const mongoose = require('mongoose');
// const mongoString = 'mongodb+srv://sachini:8rlBs2wEGl8bDRHw@assignment.fbj1m.mongodb.net/'
// const routes = require('./routes/routes');
// app.use('/api', routes);

// mongoose.connect(mongoString);
// const database = mongoose.connection;

// database.on('error', (error) => {
//     console.log(error)
// })

// database.once('connected', () => {
//     console.log('Database Connected');
// })
// const app = express();

// app.use(express.json());

// app.listen(3002, () => {
//     console.log(`Server Started at ${3002}`)
// })

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');  
const stateRoutes = require('./routes/routes'); 

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

app.use(bodyParser.json());

mongoose.connect('mongodb+srv://sachini:8rlBs2wEGl8bDRHw@assignment.fbj1m.mongodb.net/', {
  // Connect to MongoDB
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

