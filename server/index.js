const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');
const PORT = process.env.PORT || 5000;
const socket = require('socket.io');
//require('../secrets');
app.use(morgan('dev'));

//static stuff
app.use(express.static(path.join(__dirname, '..', 'public')));
//sends HTML no matter what
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});
const server = app.listen(PORT, () => {
  console.log('listening on 5000');
});

//Socket setup
const io = socket(server);
require('./socket')(io);
