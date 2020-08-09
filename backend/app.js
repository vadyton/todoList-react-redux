import express from 'express';
import mongoose from 'mongoose';
import todosRoute from './routes/todosRoute.js';

const app = express();

mongoose.connect('mongodb://localhost:27017/TodosMiddle', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});

app.use(express.json());

app.use('/api/todos', todosRoute);

app.listen(process.env.PORT ?? 3001);
