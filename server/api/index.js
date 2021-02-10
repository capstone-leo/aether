'use strict';

const api = module.exports = require('express').Router();

api.use('/users', require('./users'));
api.use('/rooms', require('./rooms'));
api.use('/state', require('./states'));
api.get('/whoami', (req, res) => res.send(req.cookie.user));
