import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import userRouter from './routes/userRouter.js';
import taskRouter from './routes/taskRouter.js';
import mongoSanitize from 'express-mongo-sanitize';
import AppError from './utils/appError.js';
import xss from 'xss-clean';
import hpp from 'hpp';
import errorController from './controllers/errorController.js';
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

// Cookie parser
app.use(cookieParser());

// ROUTERS
app.use(`/api/users`, userRouter);
app.use(`/api/tasks`, taskRouter);

// UNHANDLED ROUTES
app.all('*', (req, res, next) => {
  const err = new AppError(`Can't find ${req.originalUrl} on this server!`, 404);
  next(err);
});
// ERROR HANDLING MIDDLEWARE
app.use(errorController);

export default app;
