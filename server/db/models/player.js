const Sequelize = require('sequelize');
const db = require('../_db');

const Player = db.define('player', {
    name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
},
{
});

module.exports = Player;
