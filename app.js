const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
connectDB();
const PORT = process.env.PORT ?? 5000

const app = express();
app.use(express.json());
app.use(cors());
app.use(limiter);
app.use(morgan("dev"));
app.use(helmet());

app.use('/api/auth', authRoutes);
app.use('/api/tasks', taskRoutes);
app.use('/api/healthcheck', (_, res) => {
  res.send("Everything Is Fine & Healthy")
})

app.listen(PORT, () => {
  console.log('Server is running on port 5000');
});
