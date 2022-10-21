import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import mongoose from 'mongoose';
import app from './app.js';
// CONFIG
dotenv.config({ path: './config.env' });
// CONNECT TO DB
const DB = process.env.DB.replace('<PASSWORD>', process.env.DBPASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to DB');
  });

// STARTING APP
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server listening the port 127.0.0.1:' + port + '/');
});
