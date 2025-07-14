const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const { getAsync, setAsync } = require('./redis');

const initializeRedis = async () => {
  const existing = await getAsync('added_todos');
  if (existing === null) {
    await setAsync('added_todos', 0);
    console.log('Redis key "added_todos" initialized to 0');
  }
};
initializeRedis();

const indexRouter = require('./routes/index');
const {todosRouter} = require('./routes/todos');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());

app.use('/', indexRouter);
app.use('/todos', todosRouter);

module.exports = app;
