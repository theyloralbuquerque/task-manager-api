const TaskModel = require('../models/task.model');

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async get() {
        try {
            const tasks = await TaskModel.find({});

            this.res.status(200).send(tasks);
        } catch (e) {
            this.res.status(500).send(e.message);
        }
    }

    async getById() {
        try {
            const task_id = this.req.params.id;

            const task = await TaskModel.findById(task_id);

            if (!task) {
                return this.res.status(404).send('Tarefa não encontrada');
            }

            return this.res.status(200).send(task);
        } catch (e) {
            this.res.status(500).send(e.message);
        }
    }
}

module.exports = TaskController;
