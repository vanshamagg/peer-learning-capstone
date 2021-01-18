import 'dotenv/config';
import './models';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import api from './routes/api';
import 'colors';
import https from 'https';
import { readFileSync } from 'fs';
import { resolve } from 'path';

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

const httpsOptions = {
  key: readFileSync(resolve(__dirname, '..', 'security', 'key.pem')),
  cert: readFileSync(resolve(__dirname, '..', 'security', 'cert.pem')),
  passphrase: 'vansham',
};

// const server = https
//   .createServer(httpsOptions, app)
//   .listen(PORT, (_) => console.log(`HTTPS server running at https://localhost:${PORT}`.inverse));

const server = app.listen(PORT, '0.0.0.0')
