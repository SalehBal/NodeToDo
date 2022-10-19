import app from './app.js';
import dotenv from 'dotenv';

dotenv.config({ path: './config.env' });

const port = 3000;

// STARTING APP

app.listen(port, () => {
  console.log('Server listening the port http://localhost/' + port);
});
