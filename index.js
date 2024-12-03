const express = require('express');
const dotenv = require('dotenv');

const connectTodatabase = require('./src/database/mongoose.database');
const TaskModel = require('./src/models/task.model');

dotenv.config();
const app = express();
app.use(express.json());

connectTodatabase();

app.get('/tasks', async (req, res) => {
    try {
        const tasks = await TaskModel.finfind({});
        res.status(200).send(tasks);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.post('/tasks', async (req, res) => {
    try {
        const new_task = new TaskModel(req.body);

        await new_task.save();

        res.status(201).send(new_task);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.delete('/tasks/:id', async (req, res) => {
    try {
        const task_id = req.params.id;

        const task_to_delete = await TaskModel.findById(task_id);

        if (!task_to_delete) {
            return res.status(500).send('Tarefa não encontrada.');
        }

        const deleted_task = await TaskModel.findByIdAndDelete(task_id);

        res.status(200).send(deleted_task);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

app.listen(8000, () => console.log('Listening on port 8000!'));
