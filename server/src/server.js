import 'dotenv/config';
import './models';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import api from './routes/api';
import 'colors';
import listendpoints from 'express-list-endpoints';

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


// listing all the endpoints in the app
console.log(listendpoints(app));

const server = app.listen(PORT, _ =>  console.log(`Server started at port ${server.address().port}`.inverse))
