
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const productRoute = require('./routes/productRoute');








const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);

const database = mongoose.connection;

database.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

database.once('connected', () => {
  console.log('Database Connected');
});


const app = express();
const port = process.env.PORT || 8002;


// app.use(loggerMiddleware);
app.use(cors());
app.use(express.json());

app.use('/api/v1/', userRoutes);
app.use('/api/v1/', productRoute);




app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});
