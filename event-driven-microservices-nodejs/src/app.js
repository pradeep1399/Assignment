const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const apiRoutes = require('./routes/apiRoutes');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());

app.use('/api', apiRoutes);

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled promise rejection:', reason);
});
  
process.on('uncaughtException', (err) => {
    console.error('Uncaught exception:', err);
});

module.exports = app;
