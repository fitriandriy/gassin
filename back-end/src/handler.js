/* eslint-disable camelcase */
const { nanoid } = require('nanoid');
const mysql = require('mysql');
const books = require('./books');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gassin',
  multipleStatements: true,
});

const addRoomHandler = (request, h) => {
  const {
    id_room,
    nama_room,
    hari_dan_tanggal,
    nama_pengguna,
  } = request.payload;
  const sql = 'INSERT INTO room (id_room, nama_room) VALUES ?; INSERT INTO pengguna (id_room, nama, peran, status) VALUES ?';
  const sql2 = 'INSERT INTO pilihan_hari (id_room, hari_dan_tanggal) VALUES ?';

  // const sql3 = 'INSERT INTO pengguna (id_room, nama, peran, status) VALUES ?';
  const roomInfoValues = [
    [`${id_room}`, `${nama_room}`],
  ];
  const userInfoValues = [
    [`${id_room}`, `${nama_pengguna}`, 'host', false],
  ];

  hari_dan_tanggal.forEach((date) => {
    const data = [
      [`${id_room}`, `${date}`],
    ];
    con.query(sql2, [data], (error, result) => {
      if (error) throw error;
      console.log('Connected!');
      console.log(`Number of records inserted: ${result.affectedRows}`);
    });
  });

  con.query(sql, [roomInfoValues, userInfoValues], (error, result) => {
    if (error) throw error;
    console.log('Connected!');
    console.log(`Number of records inserted: ${result.affectedRows}`);
  });

  const response = h.response({
    status: 'success',
    message: 'Room berhasil dibuat',
  });
  response.code(200);
  return response;
};

const getRoomByIdHandler = (request, h) => {
  const { id_room } = request.params;

  con.connect((err) => {
    if (err) throw err;
    con.query(`SELECT * FROM room WHERE id_room = '${id_room}'`, (result) => {
      if (err) throw err;
      // console.log(result);
      if (result !== undefined) {
        const response = h.response({
          status: 'success',
          data: {
            result,
          },
        });
        response.code(200);
        return response;
      }
      const response = h.response({
        status: 'fail',
        message: 'Room ID tidak ditemukan',
      });
      response.code(404);
      return response;
    });
  });
  // const book = books.filter((n) => n.id === id)[0];
};

const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const id = nanoid(16);
  const finished = false;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBookItem = {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
    id,
    finished,
    insertedAt,
    updatedAt,
  };

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  books.push(newBookItem);
  const isSuccess = books.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku gagal ditambahkan',
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = () => ({
  status: 'success',
  data: {
    books: books.map((book) => ({
      id: book.id,
      name: book.name,
      publisher: book.publisher,
    })),
  },
});

const getBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  if (name === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });
    response.code(400);
    return response;
  }

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { id } = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};

module.exports = {
  addRoomHandler,
  getRoomByIdHandler,
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};
