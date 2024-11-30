// db.config.js
import mongoose from 'mongoose';

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/jobify';
console.log(url)
const connectDB = async () => {
    try {
        await mongoose.connect(url, {
            

        });
        console.log('Connected to database');
    } catch (error) {
        console.error('Database connection error:', error);
    }
};

export default connectDB;
