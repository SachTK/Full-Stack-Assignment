require('dotenv').config();
import express from 'express';
import { connect } from 'mongoose';
import { json } from 'body-parser';
import cors from 'cors';
import stateRoutes from './routes/stateRoutes'; 

const app = express();
const PORT = process.env.PORT || 3001;

// Enable CORS for all routes
app.use(cors());

app.use(json());

connect(process.env.MONGODB_URI, { 
  useNewUrlParser: true, 
  useUnifiedTopology: true
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
