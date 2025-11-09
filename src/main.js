/* eslint-disable no-undef */
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import mainRoutes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';
// import userRoutes from '../src/routes/auth.route.js'
import morgan from "morgan";
dotenv.config({ path: './.env' });


const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
console.log(process.env.MONGO_URI)

app.use(morgan("dev")); 
app.use('/', mainRoutes);
app.use(errorHandler);

async function bootstrapr() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Connected mongodb successfully!');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

bootstrapr();
