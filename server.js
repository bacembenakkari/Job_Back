

// server.js
import express from 'express';
import 'express-async-errors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRouter from './routes/authRoutes.js';
import jobsRouter from './routes/jobsRoutes.js';
import connectDB from './database/db.config.js'; // Import using ES module syntax

dotenv.config();
const app = express();
const port = 4000;

// Middleware
import notFoundMiddleware from './middleware/not-found.js';
import errorHandlerMiddleware from './middleware/error-handler.js';
import authenticateUser from './middleware/auth.js';

if(process.env.NODE_ENV !== 'production'){
    app.use(morgan('dev'))
}

app.use(express.urlencoded({ extended: true }));

app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.json({msg:'Welcome!'});
});
app.get('/api/v1', (req, res) => {
    res.json({msg:'API'});
});

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/jobs', authenticateUser, jobsRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

// Start server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}...`);
});

// Connect to the database
connectDB(); // Call the connectDB function to establish the database connection
