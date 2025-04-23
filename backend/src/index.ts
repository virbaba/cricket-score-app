import express from 'express';
// cors will provide connection between frontend and backend
import cors from 'cors';
import connectDB from './utils/db';
import matchRoutes from './routes/match.routes';
import dotenv from 'dotenv';

dotenv.config();

const frontend_url = process.env.FRONTEND_URL;
const app = express();
// defining cors options
const corsOptions = {
    origin: frontend_url
}
// using cors middleware to connect with frontend
app.use(cors(corsOptions));
// this middle hele to share json data from client to server and vice versa
app.use(express.json());

connectDB();

// this is base api
app.use('/api/cricket', matchRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
