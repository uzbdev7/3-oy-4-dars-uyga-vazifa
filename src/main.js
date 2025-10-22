import express from 'express';
import mongoose from 'mongoose';
import mainRoutes from './routes/index.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
app.use(express.json());
const PORT = 3000;

app.use('/', mainRoutes);

app.use(errorHandler);

async function bootstrapr() {
    try {
        await mongoose.connect('mongodb://localhost:27017');
        console.log('Connected mongodb successfully!');
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

bootstrapr();
