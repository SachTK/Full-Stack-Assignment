import { connect } from 'mongoose';

const MONGO_URI = 'mongodb+srv://sachini:8rlBs2wEGl8bDRHw@assignment.fbj1m.mongodb.net/';

connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });