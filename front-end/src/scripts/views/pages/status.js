import API_ENDPOINT from '../../globals/api-endpoint';
import { createUserStatusTemplate } from '../templates/template-creator';
import FavoriteMovieIdb from '../../data/favorite-movie-idb';
import UrlParser from '../../routes/url-parser';

const Status = {
  async render() {
    return `
      <div id="laman"></div>
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
      <div class="room_info">
        <p id="userRoomId"></p>
      </div>
      <div class="user_status">
        <table id="status_table">
          <tr>
            <th>Users</th>
            <th>Status</th>
          </tr>
          </table>
      </div>
      <div id="resultButton"></div>
    `;
  },
  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const room = await FavoriteMovieIdb.getMovie(parseInt(url.id, 10));
    console.log(`respond ${room.id_room}`);

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
          <span><a href="http://localhost:9009/#/status/${url.id}">status</a></span>
        </p>
      `;
    }

    if (cekStatus === null) {
      console.log('status localstorage null');
    } else if (cekStatus.includes(room.nama_pengguna)) {
      lamanButton.innerHTML = `
        <p>
          <a href="http://localhost:9009/#/detail/${url.id}">detail</a> >
          <span><a href="http://localhost:9009/#/status/${url.id}">status</a></span> >
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
          <span><a href="http://localhost:9009/#/status/${url.id}">status</a></span> >
          <a href="http://localhost:9009/#/result/${url.id}">result</a> > 
          <a href="http://localhost:9009/#/voting/${url.id}">voting</a>
        </p>
      `;
    }

    const options = {
      method: 'GET',
    };

    const response = await fetch(`${API_ENDPOINT.DETAIL_USER(room.id_room)}`, options);
    const responseJson = await response.json();
    const responseJsonArray = responseJson.data.task;
    console.log(`hasil ${JSON.stringify(responseJson)}`);
    const userStatus = document.getElementById('status_table');
    const voting = [];
    responseJsonArray.forEach((restaurant) => {
      userStatus.innerHTML += createUserStatusTemplate(restaurant);
      console.log(`respond ${restaurant}`);
      voting.push(restaurant.status);
    });

    const resultButton = document.getElementById('resultButton');
    if (!voting.includes(0)) {
      resultButton.innerHTML += '<button id="seeResult-button">SEE RESULT</button>';
      resultButton.addEventListener('click', () => {
        window.location.assign(`http://localhost:9009/#/result/${url.id}`);
      });

      const postDataResult = async () => {
        const option = {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        };
        const responses = await fetch(`${API_ENDPOINT.RESULT(room.id_room)}`, option);
        const responseJsons = await responses.json();
        console.log(responseJsons);
      };

      postDataResult();
      let users = [];
      if (users.length === 0) {
        const localItems = JSON.parse(localStorage.getItem('status'));
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
      localStorage.setItem('status', userResult);
    }
  },
};

export default Status;
