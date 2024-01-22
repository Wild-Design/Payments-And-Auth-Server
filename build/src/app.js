import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import routes from './routes/index.js';
const server = express();
server.use(express.json());
server.use(morgan('dev'));
server.use(cookieParser());
server.use(cors({
    origin: ['http://localhost:5173'],
    credentials: true,
}));
server.use(routes);
export default server;
