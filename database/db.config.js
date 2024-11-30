// db.config.js
import mongoose from 'mongoose';

const url = "mongodb+srv://bacembenakkari:Wb9jlyrXrZbZfks4@cluster0.nsmyi.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";
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
