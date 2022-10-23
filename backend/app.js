import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import helmet from 'helmet';
import userRouter from './routes/userRouter.js';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';
// APP
const app = express();

// HELMET
app.use(helmet());

// CORS
app.use(cors());

// LOG EVRY REQUEST
app.use(morgan('dev'));

// Get acces to req body
app.use(express.json());

// DATA SANITZATION NO SQL QUERY INJECTION
app.use(mongoSanitize());

// DATA SANIZATION XSS
app.use(xss());

//PREVENT PARAMETR POLLUTION
app.use(hpp());

// ROUTERS
app.use(`/api/users`, userRouter);

// UNHANDLED ROUTES
app.all('*', (req, res, next) => {
  res.status(404).json({
    mesagge: 'This rouute does not exist! ' + req.originalUrl,
  });
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
