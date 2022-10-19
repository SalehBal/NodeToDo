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
  console.log('req');
  res.json({ key: 'success' });
});

export default app;
