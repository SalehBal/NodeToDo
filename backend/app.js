import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import userRouter from './routes/userRouter.js';

// APP
const app = express();
// CORS
app.use(cors());
// LOG EVRY REQ
app.use(morgan('dev'));

// app.get('/', (req, res) => {
//   res.json({ key: 'success' });
// });

app.use(`/api/${process.env.APIVERSION}/users`, userRouter);

export default app;
