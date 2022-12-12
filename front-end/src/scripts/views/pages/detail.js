/* eslint-disable no-bitwise */
/* eslint-disable valid-typeof */
import UrlParser from '../../routes/url-parser';
import FavoriteMovieIdb from '../../data/favorite-movie-idb';
import API_ENDPOINT from '../../globals/api-endpoint';
import { createRoomDetailTemplate, createRoomDetailHourTemplate } from '../templates/template-creator';

const Detail = {
  async render() {
    return `
    <div id="laman"></div>
    <div class="detile-room">
      <div class="command-sign">
        <div id="command-sign-text">
          <h1>List Your Schedules</h1>
          <hr>
        </div>
      </div>
      <div class="command-sign">
        <div id="room-description">
          <img id="icon" src="image 24.png" alt="">
          <div> 
            <p id="room-id"></p>
            <p id="username"></p>
          </div>
        </div>
        <div id="room-description">
          <p id="event-description"></p>
          <img id="icon" src="image 22.png" alt="">
        </div>
      </div>
      <div class="command-sign" id="input-form"></div>
      <button id="submit-button">SUBMIT</button>
    </div>
      `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const room = await FavoriteMovieIdb.getMovie(parseInt(url.id, 10));
    const inputFormContainer = document.getElementById('input-form');
    // movieContainer.innerHTML = createRoomDetailTemplate(room);

    const roomIdContainer = document.getElementById('room-id');
    const usernameContainer = document.getElementById('username');
    const eventDescriptionContainer = document.getElementById('event-description');

    roomIdContainer.innerText = `Room ID : ${room.id_room}`;
    usernameContainer.innerText = `Username: ${room.nama_pengguna}`;
    eventDescriptionContainer.innerText = `${room.nama_room}`;

    room.hari_dan_tanggal.forEach((date) => {
      inputFormContainer.innerHTML += createRoomDetailTemplate(date);
      const timeInput = document.querySelector('.time-inputs');
      const addButton = document.getElementById('add-button');

      addButton.addEventListener('click', (event) => {
        timeInput.innerHTML += createRoomDetailHourTemplate(date);
        event.preventDefault();
      });
    });

    const postDataSchedule = async (roomId, nama, jamMulai, jamSelesai) => {
      const schedule = {
        roomId,
        nama,
        jamMulai,
        jamSelesai,
      };

      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(schedule),
      };

      const response = await fetch(`${API_ENDPOINT.SCHEDULE}`, options);
      const responseJson = await response.json();
      console.log(responseJson);
    };

    const timeStart = [];
    const timeFinish = [];
    const submitButton = document.getElementById('submit-button');
    const elements = document.querySelector('.detile-room');

    const lamanButton = document.getElementById('laman');
    const cekDetail = JSON.parse(localStorage.getItem('detail'));
    const cekStatus = JSON.parse(localStorage.getItem('status'));
    const cekResult = JSON.parse(localStorage.getItem('result'));

    if (cekDetail === null) {
      console.log('detail localstorage null');
    } else if (cekDetail.includes(room.nama_pengguna)) {
      lamanButton.innerHTML = `
        <p>
          <span><a href="http://localhost:9009/#/detail/${url.id}">detail</a></span> >
          <a href="http://localhost:9009/#/status/${url.id}">status</a>
        </p>
      `;
      elements.removeChild(submitButton);
    }

    if (cekStatus === null) {
      console.log('status localstorage null');
    } else if (cekStatus.includes(room.nama_pengguna)) {
      lamanButton.innerHTML = `
        <p>
          <span><a href="http://localhost:9009/#/detail/${url.id}">detail</a></span> >
          <a href="http://localhost:9009/#/status/${url.id}">status</a> >
          <a href="http://localhost:9009/#/result/${url.id}">result</a>
        </p>
      `;
    }

    if (cekResult === null) {
      console.log('voting localstorage null');
    } else if (cekResult.includes(room.nama_pengguna)) {
      lamanButton.innerHTML = `
        <p>
          <span><a href="http://localhost:9009/#/detail/${url.id}">detail</a></span> >
          <a href="http://localhost:9009/#/status/${url.id}">status</a> >
          <a href="http://localhost:9009/#/result/${url.id}">result</a> > 
          <a href="http://localhost:9009/#/voting/${url.id}">voting</a>
        </p>
      `;
    }

    const insertSchedule = (event) => {
      room.hari_dan_tanggal.forEach((date) => {
        const timeStartValue = document.querySelectorAll(`#startTimeOnDate${date}`);
        const timeFinishValue = document.querySelectorAll(`#finishTimeOnDate${date}`);
        const timeStartOnEachDate = {
          timeStart: [],
        };
        const timeFinishOnEachDate = {
          timeFinish: [],
        };

        timeStartOnEachDate.date = date;
        timeFinishOnEachDate.date = date;

        timeStartValue.forEach((start) => {
          timeStartOnEachDate.timeStart.push(start.value);
        });
        timeFinishValue.forEach((finish) => {
          timeFinishOnEachDate.timeFinish.push(finish.value);
        });

        timeStart.push(timeStartOnEachDate);
        timeFinish.push(timeFinishOnEachDate);
      });

      postDataSchedule(
        room.id_room,
        room.nama_pengguna,
        timeStart,
        timeFinish,
      );

      console.log(timeStart);
      console.log(timeFinish);
      event.preventDefault();
    };
    submitButton.addEventListener('click', () => {
      const inputJadwal = document.querySelector('.start-to-finish input').value;
      if (inputJadwal !== '') {
        let users = [];
        if (users.length === 0) {
          const localItems = JSON.parse(localStorage.getItem('detail'));
          if (localItems !== null) {
            users = localItems;
          } else {
            users = [];
            console.log('pengguna kosong');
          }
        } else {
          users = [];
          console.log('pengguna kosong dua');
        }
        users.push(room.nama_pengguna);
        const userResult = JSON.stringify(users);
        localStorage.setItem('detail', userResult);
        window.location.assign(`http://localhost:9009/#/status/${url.id}`);
        insertSchedule();
      } else {
        alert('isi jadwalmu dengan sesuai!!!');
      }
    });
  },
};

export default Detail;
