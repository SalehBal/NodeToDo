import app from './app.js';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const port = 8000;

// STARTING APP

app.listen(port, () => {
  console.log('Server listening the port 127.0.0.1:' + port + '/');
});
