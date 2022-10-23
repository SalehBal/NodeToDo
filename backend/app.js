import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import AppError from './utils/appError.js';
import userRouter from './routes/userRouter.js';

// APP
const app = express();

// CORS
app.use(cors());

// LOG EVRY REQUEST
app.use(morgan('dev'));

// ROUTERS
app.use(`/api/users`, userRouter);

// UNHANDLED ROUTES
app.all('*', (req, res, next) => {
  const err = new AppError(`Cant't find ${req.originalUrl}`, 404);
  next(err);
});
// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  console.log('err', err);
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    mesagge: err.mesagge,
  });
});

export default app;
