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
    return new TaskController(req, res).update();
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
