const Task = require('../models/Task');
const { taskSchema } = require('../utils/validate');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user._id });
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

const createTask = async (req, res) => {
    try {
        taskSchema.parse(req.body);  // Zod validation
        const task = new Task({ ...req.body, userId: req.user._id });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: error.errors || 'Invalid data' });
    }
};

const updateTask = async (req, res) => {
    try {
        taskSchema.parse(req.body);  // Zod validation
        const task = await Task.findById(req.params.id);

        if (!task || task.userId.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Task not found' });
        }

        Object.assign(task, req.body);
        await task.save();
        res.json(task);
    } catch (error) {
        consoe
        res.status(400).json({ message: error.errors || 'Invalid data' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task || task.userId.toString() !== req.user._id.toString()) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await task.deleteOne();
        res.json({ message: 'Task removed' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getTasks, createTask, updateTask, deleteTask };
