const express = require('express');
const path = require('path');
const app = express();
const morgan = require('morgan');

app.use(morgan('dev'));

//static stuff
app.use(express.static(path.join(__dirname, '..', 'public')));

//sends HTML no matter what
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

app.listen(5000, () => {
  console.log('listening on 5000');
});
