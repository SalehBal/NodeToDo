import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
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
  const err = new Error(`Cant't find ${req.originalUrl}`);
  err.statusCode = 404;
  err.status = 'fail';
  next(err);
});
// ERROR HANDLING MIDDLEWARE
app.use((err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  res.status(err.statusCode).json({
    status: err.status,
    mesagge: err.mesagge,
  });
});

export default app;
