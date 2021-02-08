'use strict';

const router = module.exports = require('express').Router();
const store = require('../store');
const { pickBy, size } = require('lodash');

const getGlobalState = (req, res, next) => {
    let { rooms, players, instruments } = store.getState()
    let state = {};
    state.numRooms = rooms.length
    state.numPlayers = size(players);
    state.rooms = rooms.map(room=> (
        { room,
          players: pickBy(players, player => room === player.room),
          instruments: pickBy(instruments, instrument => room === instrument.room)
        }));
        state.players = players;
        state.instruments = instruments
        res.json(state)
};

router.get('/', getGlobalState)
