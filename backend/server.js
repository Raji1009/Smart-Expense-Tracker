const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const expenseRoutes = require('./routes/expenses');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/expenses', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use('/api/expenses', expenseRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
