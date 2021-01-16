import 'dotenv/config';
import './models'
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import api from './routes/api';

const app = express();
const PORT = process.env.PORT || 3000;

// middleware
app.use(morgan('dev'));
app.use(cors());

// routers
app.use('/api', api);

// welcome
app.get('/', (req, res) => {
  const message = `<h1 align = 'center'> Houston, we have take-off </h1>`;
  res.send(message);
});



const server = app.listen(PORT, (_) => console.log(`Server Started at ${server.address().port}`));
