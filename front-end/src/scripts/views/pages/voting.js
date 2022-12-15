import UrlParser from '../../routes/url-parser';
import FavoriteMovieIdb from '../../data/favorite-movie-idb';
import API_ENDPOINT from '../../globals/api-endpoint';
import {
  createVotingTemplate,
} from '../templates/template-creator';

const Voting = {
  async render() {
    return `
      <div id="laman"></div>
      <div class="detile-room">
        <div class="command-sign">
          <div id="command-sign-text">
            <h1>Voting Schedules</h1>
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
        <div class="voting">
            <table id="voting_table">
                <tr>
                    <th>tanggal</th>
                    <th>jam mulai</th>
                    <th>jam selesai</th>
                    <th>jumlah voting</th>
                </tr>
            </table>
        </div>
        </div>
      </div>
        `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const room = await FavoriteMovieIdb.getMovie(parseInt(url.id, 10));

    const roomIdContainer2 = document.getElementById('room-id2');
    const usernameContainer2 = document.getElementById('username2');
    const eventDescriptionContainer2 = document.getElementById('event-description2');

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
          <a href="http://localhost:9009/#/result/${url.id}">result</a>
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
          <a href="http://localhost:9009/#/result/${url.id}">result</a> > 
          <span><a href="http://localhost:9009/#/voting/${url.id}">voting</a></span>
        </p>
      `;
    }

    const options = {
      method: 'GET',
    };
    const response = await fetch(`${API_ENDPOINT.RESULT(room.id_room)}`, options);
    const responseJson = await response.json();
    const responseJsonArray = responseJson.data.results;
    const hasilContainer = document.querySelector('#voting_table');

    responseJsonArray.forEach((hasil) => {
      const convertTanggal = hasil.tanggal.slice(0, 10);
      hasilContainer.innerHTML += createVotingTemplate(hasil, convertTanggal);
    });

    // setTimeout(() => {
    //   location.reload();
    // }, 10 * 1000);
  },
};

export default Voting;
