const {
  // getUserHandler,
  getUserByIdHandler,
  addUserByIdHandler,
  addRoomHandler,
  addScheduleByIdHandler,
  getRoomHandler,
  getHasilById,
  updateVoting,
  postUserScheduleByIdRoomHandler,
  getUserHandler,
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
    method: 'GET',
    path: '/room/{id}',
    handler: getHasilById,
  },
  {
    method: 'GET',
    path: '/user/{id}',
    handler: getUserByIdHandler,
  },
  {
    method: 'PUT',
    path: '/room/{id}',
    handler: updateVoting,
  },
  {
    method: 'POST',
    path: '/room/{id}/schedule',
    handler: postUserScheduleByIdRoomHandler,
  },
];

module.exports = routes;
