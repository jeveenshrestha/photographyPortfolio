const express = require('express');
const cors = require('cors');
require('dotenv').config();
const path = require("path");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const imageRoutes = require("./routes/imageRoutes");
const uploadRoutes = require("./routes/uploadRoutes");
const sendEmail = require("./routes/sendEmail");

const connectDB = require('./config/db');

const app = express();

app.use(cors());

//Connect Database
connectDB();

app.use(express.json({ extended: false }));

// Define Routes

app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/image", imageRoutes);

// nodeMailer
app.use("/api/send", sendEmail);

// Upload Route
app.use("/api/upload", uploadRoutes);

// Make uploads folder static
const dirname = path.resolve();
app.use('/uploads', express.static(path.join(dirname, "/uploads")));

// Middleware
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));