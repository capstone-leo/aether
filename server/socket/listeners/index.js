const Promise = require('bluebird');
const { forOwn, size, pickBy, random, find } = require('lodash');
const { Player, Room } = require('../../db');
const store = require('../../store.js');
const roomNames = require('../../roomnames');
const { addRoom } = require('../../reducers/rooms');
const { addPlayer, playerLeaves } = require('../../reducers/players');

const getRoom = () => {
  let { rooms, players } = store.getState();
  for (let room of rooms) {
    let playerCount = size(
      pickBy(players, (player) => player.room === room.id)
    );
    if (playerCount < 5) {
      return [room, false];
    }
  }
  return [roomNames[random(roomNames.length - 1)], true];
};

const setUpListeners = (io, socket) => {
  Promise.promisifyAll(socket);

  console.log('new client, and their socket id is:', socket.id);

  // socket.on('start_as_guest', data=> {
  //   let { players } = store.getState();
  //   let user = Player.create({name: data.name});
  //   let foundRoom = getRoom();
  //   let playerRoom = foundRoom[1] ? Room.create({ name: foundRoom[0] }) : Room.findById(foundRoom.id)
  //   Promise.all([playerRoom, user])
  //     .then(([dbRoom, dbuser]) => {
  //       let { id, name } = dbUser;
  //       console.log(dbUser)
  //       if (foundRoom[1]) store.dispatch(addRoom({id: dbRoom.id, name: dbRoom.name}))
  //       let room = foundRoom[1] ? dbRoom.id : foundRoom[0].id;

  //       // Create new player with db info and room
  //       let player = Object.assign({}, {socketId: socket.id, id, name, room});

  //       // Log player out of all current rooms (async, stored in array of promises)
  //       let leavePromises = [];
  //       forOwn(socket.rooms, currentRoom => {
  //         leavePromises.push(socket.leaveAsync(currentRoom));
  //       });

  //       //add player to server game state
  //       store.dispatch(addPlayer(socket.id, player))

  //       //tell all players in room to create new object for player
  //       io.sockets.in(room).emit('add_player', socket.id, player);

  //       console.log(chalk.green(`adding ${player.name} (${socket.id}) to room ${room}`));

  //       Promise.all(leavePromises)
  //         .then(() => {
  //           //Find all players in room and tell new player to add to game state
  //           let roomPlayers = pickBy(players, currentPlayer => currentPlayer.room === room);
  //           roomPlayers[socket.id] = player;

  //           // here we pass the entire players store (incl. diet arrays)
  //           socket.emitAsync('player_data', roomPlayers)
  //         })
  //         .then(()=> {
  //           let roomInstruments = pickBy(instruments, currentInstruments => currentInstruments.room === room)

  //           socket.emitAsync('instrument_data', roomInstruments)
  //         })
  //         .then(() => socket.joinAsync(room)) //join room
  //         .then(() => socket.emit('start_game'))//tell player to start game
  //     });
  // });

  // socket.on('disconnect', () => {
  //   let player = store.getState().players[socket.id];
  //   if (player) {
  //   let {world } = player;

  //   //remove player from server game state
  //   store.dispatch(playerLeaves(player));
  //     io.sockets.in(room).emit('remove_player', socket.id);
  //     }
  //     console.log(chalk.grey(`socket id ${socket.id} has disconnected.`))
  //   })

  //   //Verify client disconnect
  //   socket.on('leave', () => {
  //     let { players, rooms } = store.getState();
  //     let player = players[socket.id];
  //     if (player) {
  //       //remove player from server game state
  //       store.dispatch(playerLeaves(player));
  //       let room = rooms[player.room] ? rooms[player.room].name : player.room;
  //       io.sockets.in(player.room).emit('remove_player', socket.id);
  //       console.log(`${player.name} has left ${room}`)
  //     }
  //   })
  //   socket.on('new_message', (message) => {
  //   io.sockets.emit('add_message', { message });
  // });
};

module.exports = setUpListeners;
