//REQUIRE MODELS AND DEFINE THEIR ASSOCIATIONS HERE
const User = require('./models/user')
const Player = require('./models/player')
const Room = require('./models/room')
const Event = require('./models/event')
const EventType = require('./models/eventType')
const db = require('./_db');

User.hasMany(Player)
Player.belongsTo(User)

Room.hasMany(Player)
Player.belongsTo(Room)


Event.belongsTo(Player, { foreignKey: 'player_id' });
EventType.hasMany(Event, { foreignKey: 'event_type' });
Event.belongsTo(EventType, { as: 'type', foreignKey: 'event_type' });
Room.hasMany(Event, { underscore: true });
Event.belongsTo(Room, { underscore: true });

module.exports = { db, User, Player, Room, Event, EventType };