const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('initial')
})

app.use(require('./routes/CustomerRoute'));

module.exports = app