// const Sequelize = require('sequelize');
// const Promise = require('bluebird');
// const db = require('../_db');
// const EventType = require('./eventType');

// const Event = db.define('event', {
//   hammerStrike: {
//     type: Sequelize.BOOLEAN,
//     field: 'intersects'
//   },
//   dragInstrument: {
//     type: Sequelize.BOOLEAN,
//     field: 'is_dragging'
//   },
//   dropInstrument: {
//     type: Sequelize.BOOLEAN,
//     field: 'was_dropped',
//     time: Date.NOW()
//   },
//   instrumentDoubles: {

//   },
//   tempoIsChanging: {
//       type: Sequelize.BOOLEAN,

//   }
//   tempoChange: {
//       type: Sequelize.BOOLEAN,
//       field: 'tempo-changed'


//   },
// //   eatenPlayerPlayersEaten: {
// //     type: Sequelize.INTEGER,
// //     field: 'eaten_player_players_eaten'
// //   },
// //   eatenPlayerFoodEaten: {
// //     type: Sequelize.INTEGER,
// //     field: 'eaten_player_food_eaten'
// //   },
//   time: {
//     type: Sequelize.DATE,
//     defaultValue: Sequelize.NOW,
//     allowNull: false,
//   }
// },
// {
//   timestamps: true,
//   createAt: 'time',
//   updatedAt: false,
//   classMethods: {

//     // leaveWorld: function(player) {
//     //   let event = this.create({
//     //       volume: player.volume,
//     //       playersEaten: player.playersEaten,
//     //       foodEaten: player.foodEaten
//     //     });
//     //   let type = EventType.findOne({ where: { name: 'leave_world' }});
//     //   return Promise.all([event, type]).spread((event, type) => {
//     //     event.setType(type.id);
//     //     event.setPlayer(player.id);
//     //     event.setWorld(player.world);
//     //     return event;
//       });
//     }
//   }
// }
// );

// module.exports = Event;