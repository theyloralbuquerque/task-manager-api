const express = require('express');
const dotenv = require('dotenv');

const connectTodatabase = require('./src/database/mongoose.database');

dotenv.config();
const app = express();

connectTodatabase();

app.get('/', (req, res) => {
    const tasks = [{ description: 'Estudar', isCompleted: false }];
    res.status(200).send(tasks);
});

app.listen(8000, () => console.log('Listening on port 8000!'));
