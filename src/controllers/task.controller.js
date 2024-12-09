const TaskModel = require('../models/task.model');
const {
    notFoundError,
    objectIdCastError,
} = require('../errors/mongodb.errors');
const { notAllowedFieldsToUpdateError } = require('../errors/general.errors');
const { default: mongoose } = require('mongoose');

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
                return notFoundError(this.res);
            }

            return this.res.status(200).send(task);
        } catch (e) {
            if (e instanceof mongoose.Error.CastError) {
                return objectIdCastError(this.res);
            }
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

            if (!taskToUpdate) {
                return notFoundError(this.res);
            }

            const allowedUpdates = ['isCompleted'];
            const requestedUpdates = Object.keys(this.req.body);

            for (const update of requestedUpdates) {
                if (allowedUpdates.includes(update)) {
                    taskToUpdate[update] = task_data[update];
                } else {
                    return notAllowedFieldsToUpdateError(this.res);
                }
            }

            await taskToUpdate.save();
            return this.res.status(201).send(updated_task);
        } catch (e) {
            if (e instanceof mongoose.Error.CastError) {
                return objectIdCastError(this.res);
            }
            return this.res.status(500).send(e.message);
        }
    }

    async delete() {
        try {
            const task_id = this.req.params.id;

            const task_to_delete = await TaskModel.findById(task_id);

            if (!task_to_delete) {
                return notFoundError(this.res);
            }

            const deleted_task = await TaskModel.findByIdAndDelete(task_id);

            this.res.status(200).send(deleted_task);
        } catch (e) {
            if (e instanceof mongoose.Error.CastError) {
                return objectIdCastError(this.res);
            }
            this.res.status(500).send(e.message);
        }
    }
}

module.exports = TaskController;
