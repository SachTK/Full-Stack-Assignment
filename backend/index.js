const express = require('express');
const mongoose = require('mongoose');
const mongoString = 'mongodb+srv://sachini:8rlBs2wEGl8bDRHw@assignment.fbj1m.mongodb.net/'
const routes = require('./routes/routes');
app.use('/api', routes);

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();

app.use(express.json());

app.listen(3002, () => {
    console.log(`Server Started at ${3002}`)
})

