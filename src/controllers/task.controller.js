const TaskModel = require('../models/task.model');

class TaskController {
    constructor(req, res) {
        this.req = req;
        this.res = res;
    }

    async getAll() {
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

    async create() {
        try {
            const new_task = new TaskModel(this.req.body);

            await new_task.save();

            this.res.status(201).send(new_task);
        } catch (e) {
            this.res.status(500).send(e.message);
        }
    }

    async update() {
        try {
            const task_id = this.req.params.id;
            const task_data = this.req.body;

            const taskToUpdate = await TaskModel.findById(task_id);

            const allowedUpdates = ['isCompleted'];
            const requestedUpdates = Object.keys(this.req.body);

            for (const update of requestedUpdates) {
                if (allowedUpdates.includes(update)) {
                    taskToUpdate[update] = task_data[update];
                } else {
                    return this.res
                        .status(500)
                        .send('Um ou mais campos inseridos não são editáveis');
                }
            }

            await taskToUpdate.save();
            return this.res.status(201).send(updated_task);
        } catch (e) {
            return this.res.status(500).send(e.message);
        }
    }

    async delete() {
        try {
            const task_id = this.req.params.id;

            const task_to_delete = await TaskModel.findById(task_id);

            if (!task_to_delete) {
                return this.res.status(404).send('Tarefa não encontrada.');
            }

            const deleted_task = await TaskModel.findByIdAndDelete(task_id);

            this.res.status(200).send(deleted_task);
        } catch (e) {
            this.res.status(500).send(e.message);
        }
    }
}

module.exports = TaskController;
