const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String },
    status: { type: String, enum: ['To Do', 'In Progress', 'Completed'] },
    priority: { type: String, enum: ['Low', 'Medium', 'High'] },
    dueDate: { type: Date },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Task', taskSchema);
