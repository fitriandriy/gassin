/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import UrlParser from '../../routes/url-parser';
import FavoriteMovieIdb from '../../data/favorite-movie-idb';
import API_ENDPOINT from '../../globals/api-endpoint';
import {
  createResultTemplate,
  createResultTemplateHour,
} from '../templates/template-creator';

const Result = {
  async render() {
    return `
      <div id="laman"></div>
      <div class="detile-room">
        <div class="command-sign">
          <div id="command-sign-text">
            <h1>Result Your Schedules</h1>
            <hr>
          </div>
        </div>
        <div class="command-sign">
          <div id="room-description">
            <img id="icon" src="image 24.png" alt="">
            <div> 
              <p id="room-id2"></p>
              <p id="username2"></p>
            </div>
          </div>
          <div id="room-description">
            <p id="event-description2"></p>
            <img id="icon" src="image 22.png" alt="">
          </div>
        </div>
        <div class="command-sign" id="result"></div>
        <button id="submit-button">SUBMIT</button>
      </div>
        `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const room = await FavoriteMovieIdb.getMovie(parseInt(url.id, 10));

    const roomIdContainer2 = document.getElementById('room-id2');
    const usernameContainer2 = document.getElementById('username2');
    const eventDescriptionContainer2 = document.getElementById('event-description2');
    const elements = document.querySelector('.detile-room');
    const submitButton = document.getElementById('submit-button');

    roomIdContainer2.innerText = `Room ID : ${room.id_room}`;
    usernameContainer2.innerText = `Username: ${room.nama_pengguna}`;
    eventDescriptionContainer2.innerText = `${room.nama_room}`;

    const lamanButton = document.getElementById('laman');
    const cekDetail = JSON.parse(localStorage.getItem('detail'));
    const cekStatus = JSON.parse(localStorage.getItem('status'));
    const cekResult = JSON.parse(localStorage.getItem('result'));

    if (cekDetail === null) {
      console.log('detail localstorage null');
    } else if (cekDetail.includes(room.nama_pengguna)) {
      lamanButton.innerHTML = `
        <p>
          <a href="http://localhost:9009/#/detail/${url.id}">detail</a> >
          <a href="http://localhost:9009/#/status/${url.id}">status</a>
        </p>
      `;
    }

    if (cekStatus === null) {
      console.log('status localstorage null');
    } else if (cekStatus.includes(room.nama_pengguna)) {
      lamanButton.innerHTML = `
        <p>
          <a href="http://localhost:9009/#/detail/${url.id}">detail</a> >
          <a href="http://localhost:9009/#/status/${url.id}">status</a> >
          <span><a href="http://localhost:9009/#/result/${url.id}">result</a></span>
        </p>
      `;
    }

    if (cekResult === null) {
      console.log('voting localstorage null');
    } else if (cekResult.includes(room.nama_pengguna)) {
      lamanButton.innerHTML = `
        <p>
          <a href="http://localhost:9009/#/detail/${url.id}">detail</a> >
          <a href="http://localhost:9009/#/status/${url.id}">status</a> >
          <span><a href="http://localhost:9009/#/result/${url.id}">result</a></span> > 
          <a href="http://localhost:9009/#/voting/${url.id}">voting</a>
        </p>
      `;
      elements.removeChild(submitButton);
    }

    const options = {
      method: 'GET',
    };
    const response = await fetch(`${API_ENDPOINT.RESULT(room.id_room)}`, options);
    const responseJson = await response.json();
    const responseJsonArray = responseJson.data.results;
    const hasilContainer = document.querySelector('#result');

    const tanggal = [];
    responseJsonArray.forEach((hasil) => {
      if (tanggal.includes(hasil.tanggal) === false) {
        tanggal.push(hasil.tanggal);
      }
    });
    console.log(`tanggal ${JSON.stringify(tanggal)}`);

    const data = [];
    for (let i = 0; i < tanggal.length; i += 1) {
      const hourArray = [];
      // eslint-disable-next-line no-loop-func
      responseJsonArray.forEach((hasil) => {
        if (tanggal[i] === hasil.tanggal) {
          const objectHour = {
            jam_mulai: hasil.jam_mulai,
            jam_selesai: hasil.jam_selesai,
            id_hasil: hasil.id_hasil,
          };
          hourArray.push(objectHour);
        }
      });
      data.push(hourArray);
    }
    console.log(`data= ${JSON.stringify(data)}`);

    for (let j = 0; j < tanggal.length; j += 1) {
      hasilContainer.innerHTML += createResultTemplate(tanggal[j]);
      const hour = document.querySelector('.schedule:last-child .hours');
      for (let z = 0; z < data[j].length; z += 1) {
        hour.innerHTML += createResultTemplateHour(data[j][z]);
      }
    }

    let users = [];
    if (users.length === 0) {
      const localItems = JSON.parse(localStorage.getItem('result'));
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
    submitButton.addEventListener('click', () => {
      localStorage.setItem('result', userResult);

      responseJsonArray.forEach((hasil) => {
        const buttonCheck = document.getElementById(`${hasil.id_hasil}`).checked;
        if (buttonCheck) {
          console.log('test');
          const userAction = async () => {
            const response = await fetch(`${API_ENDPOINT.UPDATE_VOTING(hasil.id_hasil)}`, {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
            });
            const myJson = await response.json();
            console.log(myJson);
          };
          userAction();
        }
      });
      window.location.assign(`http://localhost:9009/#/voting/${url.id}`).reload(true);
    });
  },
};

export default Result;
