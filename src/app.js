
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const studentRoutes = require('./routes/studentRoutes');
const courseRoutes = require('./routes/courseRoutes');
const authenticateToken = require('./middleware/authMiddleware');

const app = express();
const port = 5000;

// Allow requests from all origins during development (adjust origin based on your setup)
app.use(cors());

app.use(bodyParser.json());

// Public routes
app.use('/api/auth', authRoutes);

// Protected routes
app.use(authenticateToken);
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
