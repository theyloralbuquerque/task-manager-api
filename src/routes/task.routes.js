const express = require('express');

const TaskController = require('../controllers/task.controller');
const TaskModel = require('../models/task.model');

const router = express.Router();

router.get('/', async (req, res) => {
    return new TaskController(req, res).get();
});

router.get('/:id', async (req, res) => {
    return new TaskController(req, res).getById();
});

router.post('/', async (req, res) => {
    return new TaskController(req, res).create();
});

router.patch('/:id', async (req, res) => {
    try {
        const task_id = req.params.id;
        const task_data = req.body;

        const taskToUpdate = await TaskModel.findById(task_id);

        const allowedUpdates = ['isCompleted'];
        const requestedUpdates = Object.keys(req.body);

        for (const update of requestedUpdates) {
            if (allowedUpdates.includes(update)) {
                taskToUpdate[update] = task_data[update];
            } else {
                return res
                    .status(500)
                    .send('Um ou mais campos inseridos não são editáveis');
            }
        }

        await taskToUpdate.save();
        return res.status(201).send(updated_task);
    } catch (e) {
        return res.status(500).send(e.message);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const task_id = req.params.id;

        const task_to_delete = await TaskModel.findById(task_id);

        if (!task_to_delete) {
            return res.status(404).send('Tarefa não encontrada.');
        }

        const deleted_task = await TaskModel.findByIdAndDelete(task_id);

        res.status(200).send(deleted_task);
    } catch (e) {
        res.status(500).send(e.message);
    }
});

module.exports = router;
