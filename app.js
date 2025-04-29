const express = require('express');
require('express-async-errors');
require('dotenv').config();
const cors = require('cors')
const path = require('path')

const userRoutes = require('./routes/user.routes');
const courseRoutes = require('./routes/course.routes');
const lessonRoutes = require('./routes/lesson.routes');
const admissionRoutes = require('./routes/admission.routes');
const errorHandler = require('./middlewares/error-handler.middleware');
const dbConnect = require('./config/db-connection.config');

dbConnect();

const app = express();
const PORT = process.env.PORT || 5000;

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(
  cors({
    origin: "http://localhost:8080",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/users', userRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/lessons', lessonRoutes);
app.use('/api/admissions', admissionRoutes);
app.use('/api/email', require('./routes/email.routes'));
// app.use(errorHandler);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello, World!' });
});

app.listen(PORT, () => console.log(`Server is listening on port: ${PORT}`));
