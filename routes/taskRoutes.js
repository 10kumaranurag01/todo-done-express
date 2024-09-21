const express = require('express');
const { getTasks, createTask, updateTask, deleteTask } = require('../controllers/taskController');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();

router.route('/').get(authMiddleware, getTasks).post(authMiddleware, createTask);
router.route('/:id').put(authMiddleware, updateTask).delete(authMiddleware, deleteTask);

module.exports = router;
