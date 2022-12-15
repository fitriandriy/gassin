/* eslint-disable eqeqeq */
/* eslint-disable prefer-rest-params */
/* eslint-disable prefer-destructuring */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable camelcase */
const mysql = require('mysql');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'gassin',
  multipleStatements: true,
});

const getAllUser = () => new Promise((resolve, reject) => {
  const selectPenggunaByIdRoom = 'SELECT * FROM pengguna';
  con.query(selectPenggunaByIdRoom, [], (err, results) => {
    if (err) {
      return reject(err);
    }
    return resolve(results);
  });
});

const getUserHandler = async (request, h) => {
  const user = await getAllUser();

  const response = h.response({
    status: 'success',
    message: 'Input data berhasil',
    data: {
      user,
    },
  });
  console.log('Pengguna ditemukan');
  response.code(200);
  return response;
};

const addRoomHandler = (request, h) => {
  const {
    id_room,
    nama_room,
    hari_dan_tanggal,
    nama_pengguna,
  } = request.payload;
  const sql = 'INSERT INTO room (id_room, nama_room) VALUES ?; INSERT INTO pengguna (id_room, nama, peran, status) VALUES ?';
  const sql2 = 'INSERT INTO pilihan_hari (id_room, hari_dan_tanggal) VALUES ?';

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

const addUserByIdHandler = (request, h) => {
  const { id_room, nama_pengguna } = request.payload;
  const addQuery = `INSERT INTO pengguna (id_room, nama, peran, status) VALUES ('${id_room}', '${nama_pengguna}', 'entrant', false)`;

  con.query(addQuery, (error) => {
    if (error) throw error;
    console.log('1 record inserted');
  });

  const response = h.response({
    status: 'success',
    message: 'Input data berhasil',
  });
  response.code(200);
  return response;
};

const getUserId = (nama, roomId) => new Promise((resolve, reject) => {
  const selectIdPengguna = `select id_pengguna from pengguna where nama = '${nama}' AND id_room = '${roomId}'`;
  con.query(selectIdPengguna, (err, results) => {
    if (err) {
      return reject(err);
    }
    return resolve(results);
  });
});

const addScheduleByIdHandler = async (request, h) => {
  const {
    roomId,
    nama,
    jamMulai,
    jamSelesai,
  } = request.payload;

  const userId = await getUserId(nama, roomId);
  console.log(`
  nama: ${nama}
  roomId: ${roomId}
  userId: ${userId[0].id_pengguna}
  `);
  const response = h.response({
    status: 'success',
    message: 'Input data berhasil',
    data: {
      userId,
      roomId,
      jamMulai,
      jamSelesai,
    },
  });

  const queryUpdate = `UPDATE pengguna SET status = 1 WHERE id_pengguna = ${userId[0].id_pengguna};`;
  con.query(queryUpdate, (err) => {
    if (err) throw err;
  });

  for (let i = 0; i < jamMulai.length; i++) {
    const timeStartADate = jamMulai[i].timeStart;
    const timeFinishADate = jamSelesai[i].timeFinish;
    console.log(`Finish: ${timeFinishADate}`);
    console.log(`Start: ${timeStartADate}`);

    for (let b = 0; b < timeStartADate.length; b++) {
      const insertQuery = `INSERT INTO jadwal_pengguna (id_pengguna, tanggal, jam_mulai, jam_selesai)
      VALUES (${userId[0].id_pengguna}, '${jamMulai[i].date}', '${timeStartADate[b]}', '${timeFinishADate[b]}');`;

      if (timeStartADate[b] !== '' && timeFinishADate[b] !== '') {
        con.query(insertQuery, (err) => {
          if (err) throw err;
        });
      }
    }
  }
  console.log('Pengguna ditemukan');
  response.code(200);
  return response;
};

const getAllRooms = () => new Promise((resolve, reject) => {
  const query = 'SELECT * FROM room; SELECT * FROM pilihan_hari';
  con.query(query, [], (err, results) => {
    if (err) {
      return reject(err);
    }
    return resolve(results);
  });
});

const getRoomHandler = async () => {
  const results = await getAllRooms();
  return {
    data: {
      room: results[0],
      pilihan_hari: results[1],
      hasil: results[2],
      pengguna: results[3],
    },
  };
};

const getUserScheduleByIdRoom = (id_room) => new Promise((resolve, reject) => {
  const query = `SELECT * FROM jadwal_pengguna JOIN pengguna ON jadwal_pengguna.id_pengguna=pengguna.id_pengguna WHERE id_room = '${id_room}';
  SELECT * FROM pilihan_hari WHERE id_room = '${id_room}'`;
  con.query(query, [], (err, results) => {
    if (err) {
      return reject(err);
    }
    return resolve(results);
  });
});

function intersection() {
  const result = [];
  let lists;

  if (arguments.length === 1) {
    lists = arguments[0];
  } else {
    lists = arguments;
  }

  for (let i = 0; i < lists.length; i++) {
    const currentList = lists[i];
    for (let y = 0; y < currentList.length; y++) {
      const currentValue = currentList[y];
      if (result.indexOf(currentValue) === -1) {
        if (lists.filter((obj) => obj.indexOf(currentValue) === -1).length === 0) {
          result.push(currentValue);
        }
      }
    }
  }
  return result;
}

const postUserScheduleByIdRoomHandler = async (request, h) => {
  const { id } = request.params;
  const results = await getUserScheduleByIdRoom(id);
  const result = results[0];

  const date = [];
  const dayOption = results[1];
  dayOption.forEach((day) => {
    date.push((`${day.hari_dan_tanggal}`).slice(0, 10));
  });

  const listAllScheduleByDate = [];
  for (let i = 0; i < date.length; i++) {
    listAllScheduleByDate.push([]);
  }

  let listAllSchedule = [];
  let intervals = [];

  for (let i = 0; i < result.length; i++) {
    const dateIndex = date.indexOf(`${result[i].tanggal}`.slice(0, 10));
    listAllScheduleByDate[dateIndex].push(result[i]);
    console.log(`ini result = ${JSON.stringify(result[i])}`);
    console.log(`ini list itu = ${JSON.stringify(listAllScheduleByDate[dateIndex])}`);
  }

  function convertNumToTime(number) {
    let sign = (number >= 0) ? 1 : -1;
    // eslint-disable-next-line no-param-reassign
    number *= sign;
    const hour = Math.floor(number);
    let decpart = number - hour;
    const min = 1 / 60;
    decpart = min * Math.round(decpart / min);
    let minute = `${Math.floor(decpart * 60)}`;

    if (minute.length < 2) {
      minute = `0${minute}`;
    }

    sign = sign == 1 ? '' : '-';
    const time = `${sign + hour}:${minute}`;

    return time;
  }

  const createInterval = (start, to) => {
    const startInt = parseFloat(start.replace(/:/gi, '.'));
    const toInt = parseFloat(to.replace(/:/gi, '.'));
    for (let i = startInt; i <= toInt; i += 0.01) {
      const ini = i.toString().split('.');
      if (ini.length === 1) {
        ini.push('00');
      }
      if (parseInt(ini[1].charAt(0), 10) < 6) {
        intervals.push(i.toFixed(2));
      }
    }
  };

  for (let a = 0; a < listAllScheduleByDate.length; a++) {
    const schedule = listAllScheduleByDate[a];
    for (let i = 0; i < schedule.length; i++) {
      const idUser = schedule[i].id_pengguna;
      const start = schedule[i].jam_mulai;
      const end = schedule[i].jam_selesai;
      if (i === 0) {
        createInterval(start, end);
      } else if (idUser === schedule[i - 1].id_pengguna) {
        if (i === schedule.length - 1) {
          createInterval(start, end);
          listAllSchedule.push(intervals);
        } else {
          createInterval(start, end);
        }
      } else if (idUser !== schedule[i - 1].id_pengguna) {
        listAllSchedule.push(intervals);
        intervals = [];
        if (i === schedule.length - 1) {
          createInterval(start, end);
          listAllSchedule.push(intervals);
        } else {
          createInterval(start, end);
        }
      }
    }
    const freeTimeIntersection = intersection([...listAllSchedule]);

    const inputZero = (time, b, position) => {
      const output = [time.slice(0, position), b, time.slice(position)].join('');
      return output;
    };

    const dataBaru = [];
    freeTimeIntersection.forEach((hour) => {
      if (hour.length === 4) {
        dataBaru.push(inputZero(hour, '0', 0));
      }

      if (hour.length === 5) {
        dataBaru.push(hour);
      }
    });

    const freeTimeADate = [];
    for (let z = 0; z < dataBaru.length; z++) {
      let eachFreeTime = [];

      if (z == 0) {
        eachFreeTime.push(dataBaru[0]);
        freeTimeADate.push(eachFreeTime);
      }

      if (z == dataBaru.length - 1) {
        eachFreeTime.push(dataBaru[z]);
        freeTimeADate.push(eachFreeTime);
      }

      if (z > 0) {
        const menitSama = parseInt(`${dataBaru[z]}`.slice(-2), 10) == parseInt(`${dataBaru[z - 1]}`.slice(-2), 10) + 1;
        const jamSama = `${dataBaru[z]}`.slice(0, 2) == `${dataBaru[z - 1]}`.slice(0, 2);
        const menitBeda = parseInt(`${dataBaru[z]}`.slice(-2), 10) != parseInt(`${dataBaru[z - 1]}`.slice(-2), 10) + 1;
        const jamBeda = `${dataBaru[z]}`.slice(0, 2) != `${dataBaru[z - 1]}`.slice(0, 2);

        if (menitSama && jamSama) {
          // eslint-disable-next-line no-unused-vars
          const skip = true;
        }

        if (menitSama && jamBeda) {
          eachFreeTime.push(dataBaru[z - 1]);
          freeTimeADate.push(eachFreeTime);
          eachFreeTime = [];
          eachFreeTime.push(dataBaru[z]);
          freeTimeADate.push(eachFreeTime);
        }
        if (menitBeda) {
          eachFreeTime.push(dataBaru[z - 1]);
          freeTimeADate.push(eachFreeTime);
          eachFreeTime = [];
          eachFreeTime.push(dataBaru[z]);
          freeTimeADate.push(eachFreeTime);
        }
      }
    }

    const dateObj = new Date(`${date[a]}`);
    const month = dateObj.getUTCMonth() + 1; // months from 1-12
    const day = dateObj.getUTCDate() + 1;
    const year = dateObj.getUTCFullYear();

    const newdate = `${year}-${month}-${day}`;
    console.log(newdate);

    for (let z = 0; z < freeTimeADate.length; z += 2) {
      const insertQuery = `INSERT INTO hasil (id_room, tanggal, jam_mulai, jam_selesai, voting)
      VALUES ('${id}', '${newdate}', '${convertNumToTime(freeTimeADate[z])}', '${convertNumToTime(freeTimeADate[z + 1])}', ${0});`;
      con.query(insertQuery, (err) => {
        if (err) throw err;
      });
    }

    console.log(`freetime tiap tanggal = ${freeTimeADate}`);
    if (freeTimeADate.length == 0) {
      const response = h.response({
        status: 'success',
        message: 'Tidak menemukan kesamaan waktu',
      });
      response.code(400);
      return response;
    }
    listAllSchedule = [];
  }

  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
  };

  const response = h.response({
    status: 'success',
    headers,
    message: 'Data berhasil diinput',
  });
  response.code(200);
  return response;
};

const getUserByIdRoom = (roomId) => new Promise((resolve, reject) => {
  const selectIdPengguna = `select * from pengguna where id_room = '${roomId}'`;
  con.query(selectIdPengguna, (err, results) => {
    if (err) {
      return reject(err);
    }
    return resolve(results);
  });
});

const getResultByIdRoom = (roomId) => new Promise((resolve, reject) => {
  const selectIdPengguna = `select * from hasil where id_room = '${roomId}'`;
  con.query(selectIdPengguna, (err, results) => {
    if (err) {
      return reject(err);
    }
    return resolve(results);
  });
});

const getUserByIdHandler = async (request, h) => {
  const { id } = request.params;
  const result = await getUserByIdRoom(id);

  // const userId = await getAllRooms();
  // const task = userId[3].filter((hasil) => hasil.id_room === id);

  const response = h.response({
    status: 'success',
    message: 'data pengguna berhasil ditampilkan',
    data: {
      result,
    },
  });
  response.code(200);
  return response;
};

const getHasilById = async (request, h) => {
  const { id } = request.params;
  const results = await getResultByIdRoom(id);
  // const task = results[2].filter((hasil) => hasil.id_room === id);

  const response = h.response({
    status: 'success',
    message: 'data hasil jadwal berhasil ditampilkan',
    data: {
      results,
    },
  });
  response.code(200);
  return response;
};

const getVotingByIdResult = (id) => new Promise((resolve, reject) => {
  const selectIdPengguna = `select voting from hasil where id_hasil = '${id}'`;
  con.query(selectIdPengguna, (err, results) => {
    if (err) {
      return reject(err);
    }
    return resolve(results);
  });
});

const updateVoting = async (request, h) => {
  const { id } = request.params;
  const voting = await getVotingByIdResult(id);
  const newVoting = voting[0].voting + 1;
  const sql = `UPDATE hasil SET voting = ${newVoting} WHERE id_hasil = ${id}`;

  con.query(sql, (err, results) => {
    if (err) throw err;
    return results;
  });

  const response = h.response({
    status: 'success',
    message: 'Voting berhasil',
  });
  response.code(200);
  return response;
};

module.exports = {
  getUserByIdHandler,
  updateVoting,
  getHasilById,
  getUserHandler,
  getRoomHandler,
  addRoomHandler,
  addUserByIdHandler,
  addScheduleByIdHandler,
  postUserScheduleByIdRoomHandler,
};
