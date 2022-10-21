import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

// APP
const app = express();
// CORS
app.use(cors());
// LOG EVRY REQ
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.json({ key: 'success' });
});
// CONFIG
dotenv.config({ path: './config.env' });

const port = 8000;

// STARTING APP

app.listen(port, () => {
  console.log('Server listening the port 127.0.0.1:' + port + '/');
});
