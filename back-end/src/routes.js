const {
  getUserHandler,
  addUserByIdHandler,
  addRoomHandler,
  addScheduleByIdHandler,
  getRoomHandler,
  postUserScheduleByIdRoomHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/room',
    handler: addRoomHandler,
  },
  {
    method: 'POST',
    path: '/user',
    handler: addUserByIdHandler,
  },
  {
    method: 'GET',
    path: '/user',
    handler: getUserHandler,
  },
  {
    method: 'POST',
    path: '/user/schedule',
    handler: addScheduleByIdHandler,
  },
  {
    method: 'GET',
    path: '/room',
    handler: getRoomHandler,
  },
  {
    method: 'POST',
    path: '/room/{id}/schedule',
    handler: postUserScheduleByIdRoomHandler,
  },
];

module.exports = routes;
