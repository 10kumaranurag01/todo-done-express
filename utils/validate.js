const { z } = require('zod');

const registerSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const loginSchema = z.object({
    username: z.string().min(1, 'Username is required'),
    password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const taskSchema = z.object({
    title: z.string().min(1, 'Title is required'),
    description: z.string().optional(),
    status: z.enum(['To Do', 'In Progress', 'Completed']),
    priority: z.enum(['Low', 'Medium', 'High']),
    dueDate: z.string().optional(),
});

module.exports = { registerSchema, loginSchema, taskSchema };
