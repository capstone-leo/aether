const Sequelize = require('sequelize');
const Promise = require('bluebird');
const db = require('../_db');
const EventType = require('./eventType');

const Event = db.define('event', {
  //isdragging, drop, tempo change, click play, doubleclick clone, hover,

  isDragging: {
      type: Sequelize.BOOLEAN,
      field: 'isDragging',
  },
  drop: {
      type: Sequelize.BOOLEAN,
      field: 'drop',
  },
  tempoChange: {
      type: Sequelize.FLOAT,
      field: 'tempoChange',
  },
  clickPlay: {
      type: Sequelize.BOOLEAN,
      field: 'clickPlay'
  },
  time: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
    allowNull: false,
  }
},
{
  timestamps: true,
  createAt: 'time',
  updatedAt: false,
  classMethods: {
    joinRoom: function(player) {
      let event = this.create({
        //   volume: player.volume,
        //   playersEaten: player.playersEaten,
        //   foodEaten: player.foodEaten
        });
      let type = EventType.findOne({ where: { name: 'join_room' }});
      return Promise.all([event, type]).spread((event, type) => {
        event.setType(type.id);
        event.setPlayer(player.id);
        event.setRoom(player.room);
        return event;
      });
    },
    leaveRoom: function(player) {
      let event = this.create({
        });
      let type = EventType.findOne({ where: { name: 'leave_room' }});
      return Promise.all([event, type]).spread((event, type) => {
        event.setType(type.id);
        event.setPlayer(player.id);
        event.setRoom(player.room);
        return event;
      });
    }
  }
}
);

module.exports = Event