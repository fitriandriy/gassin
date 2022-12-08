/* eslint-disable no-dupe-else-if */
import UrlParser from '../../routes/url-parser';
import FavoriteMovieIdb from '../../data/favorite-movie-idb';
import {
  createRoomDetailTemplate,
  createResultTemplate,
  createResultTemplateHour,
} from '../templates/template-creator';
import API_ENDPOINT from '../../globals/api-endpoint';

const Detail = {
  async render() {
    return `
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
    console.log(url);
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
    });

    const timeStart = [];
    const timeFinish = [];
    const submitButton = document.getElementById('submit-button');

    const insertSchedule = (event) => {
      const timeStartValue = document.querySelectorAll('#start');
      const timeFinishValue = document.querySelectorAll('#finish');
      timeStartValue.forEach((start) => {
        timeStart.push(start.value);
      });
      timeFinishValue.forEach((finish) => {
        timeFinish.push(finish.value);
      });
      console.log(timeStart);
      console.log(timeFinish);
      event.preventDefault();
    };
    submitButton.addEventListener('click', insertSchedule);

    // detail-result
    // const resultContainer = document.getElementById('reslult');

    const roomIdContainer2 = document.getElementById('room-id2');
    const usernameContainer2 = document.getElementById('username2');
    const eventDescriptionContainer2 = document.getElementById('event-description2');

    roomIdContainer2.innerText = `Room ID : ${room.id_room}`;
    usernameContainer2.innerText = `Username: ${room.nama_pengguna}`;
    eventDescriptionContainer2.innerText = `${room.nama_room}`;

    console.log('test');

    const options = {
      method: 'GET',
    };

    const response = await fetch(`${API_ENDPOINT.DETAIL_ROOM(room.id_room)}`, options);
    const responseJson = await response.json();
    const hasilContainer = document.querySelector('#result');

    const tanggal = [];
    // container
    // responseJson.forEach((hasil) => {
    //   console.log(`${hasil.id_hasil}: ${hasil.tanggal.includes(tanggal)}`);
    //   if ((tanggal.length === 0) || (tanggal.includes(hasil.tanggal) === false)) {
    //     const hasilContainer = document.querySelector('#result');
    //     hasilContainer.innerHTML += createResultTemplate(hasil);
    //     const hour = document.querySelector('.hours');
    //     hour.innerHTML += createResultTemplateHour(hasil);
    //     tanggal.push(hasil.tanggal);
    //   } else if ((tanggal.length > 0) && (tanggal.includes(hasil.tanggal) === true)) {
    //     const hour = document.querySelector('.hours');
    //     hour.innerHTML += createResultTemplateHour(hasil);
    //   }
    // });
    responseJson.forEach((hasil) => {
      if (tanggal.includes(hasil.tanggal) === false) {
        tanggal.push(hasil.tanggal);
      }
    });
    const data = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < tanggal.length; i++) {
      const hourArray = [];
      // eslint-disable-next-line no-loop-func
      responseJson.forEach((hasil) => {
        if (tanggal[i] === hasil.tanggal) {
          const objectHour = { jamMulai: hasil.jamMulai, jamBerakhir: hasil.jamBerakhir };
          hourArray.push(objectHour);
        }
      });
      data.push(hourArray);
    }
    console.log(tanggal);
    console.log(data);
    // eslint-disable-next-line no-plusplus
    for (let j = 0; j < tanggal.length; j++) {
      hasilContainer.innerHTML += createResultTemplate(tanggal[j]);
      const hour = document.querySelector('.schedule:last-child .hours');
      // const newhour = hour.textContent;
      // eslint-disable-next-line no-plusplus
      for (let z = 0; z < data[j].length; z++) {
        hour.innerHTML += createResultTemplateHour(data[j][z]);
      }
    }
  },
};

export default Detail;
