const express = require('express');
const dotenv = require('dotenv');
const cors = required('cors');

const TaskRouter = require('./src/routes/task.routes');
const connectTodatabase = require('./src/database/mongoose.database');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

connectTodatabase();

app.use('/tasks', TaskRouter);

app.listen(8000, () => console.log('Listening on port 8000!'));
