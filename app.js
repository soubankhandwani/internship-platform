const express = require('express');
require('express-async-errors');
require('dotenv').config();

const userRoutes = require('./routes/user.routes');
const courseRoutes = require('./routes/course.routes');
const lessonRoutes = require('./routes/lesson.routes');
const errorHandler = require('./middlewares/error-handler.middleware');
const dbConnect = require('./config/db-connection.config');

dbConnect();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
