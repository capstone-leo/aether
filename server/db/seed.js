'use strict';


const { EventType, db } = require('./index');

  let eventTypes = [
     { name: 'join_room' },
     { name: 'leave_room' },
     { name: 'drag' },
     { name: 'drop' },
     { name: 'tempochange' }
  ];


db.sync({force: true})
.then(() => {
  console.log('Dropped old data, now inserting data');
  return eventTypes.map((eventType) =>  EventType.create(eventType));
})
.then(() => {
 console.log('Finished inserting data (press ctrl-c to exit)');
})
.catch((err) => {
 console.error('There was totally a problem', err, err.stack);
});
