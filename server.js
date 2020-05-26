const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const requireDir = require('require-dir');

const app = express();
app.use(express.json()); // permite que envie dados para app no formato de json
app.use(cors());

mongoose.connect('mongodb://localhost:27017/rocketseat_starter_nodeapi',
    { useNewUrlParser: true, useUnifiedTopology: true }
);
requireDir('./src/models');

app.use('/api', require('./src/routes'));


app.listen(3001);