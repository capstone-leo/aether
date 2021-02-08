const Sequelize = require('sequelize');
const db = require('../_db');

const Room = db.define('room', {
  name: {
    type: Sequelize.STRING
  },
  destroyedAt: {
    type: Sequelize.DATE,
    field: 'destroyed_at'
  }
},
{
  classMethods: {
    blowUp: function(id) {
      this.update({ destroyedAt: Date.now() }, { where: { id }});
    }
  }
});

module.exports = Room;
