const {
  addBookHandler,
  addUserByIdHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
  addRoomHandler,
  getRoomHandler,
  getHasilById,
  getUserHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: addBookHandler,
  },
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
    handler: getUserHandler,
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: editBookByIdHandler,
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: deleteBookByIdHandler,
  },
];

module.exports = routes;
