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
      <div id="seeResult">
        <button id="buttonSeeResult">SEE RESULT</button>
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

    const options = {
      method: 'GET',
    };

    const response = await fetch(`${API_ENDPOINT.DETAIL_USER(room.id_room)}`, options);
    const responseJson = await response.json();
    const responseJsonArray = responseJson.data.result;
    const userStatus = document.getElementById('status_table');
    const seeResultButton = document.getElementById('buttonSeeResult');
    let peranUser;
    const voting = [];

    responseJsonArray.forEach((user) => {
      userStatus.innerHTML += createUserStatusTemplate(user);
      voting.push(user.status);

      if (user.nama === room.nama_pengguna) {
        peranUser = user.peran;
      }
    });

    const postDataResult = async (event) => {
      const option = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const responses = await fetch(`${API_ENDPOINT.RESULT(room.id_room)}`, option);
      const responseJsons = await responses.json();
      if (responseJsons.status === 'success') {
        if (confirm('Data berhasil dimuat.') === true) {
          window.location.assign(`http://localhost:9009/#/result/${url.id}`);
        }
      }
      event.preventDefault();
    };

    if (peranUser === 'host') {
      seeResultButton.addEventListener('click', () => {
        if (confirm('Apakah anda yakin ingin menutup room dan melihat hasil?\nPastikan semua partisipan berstatus 1!') === true) {
          postDataResult();
          window.location.assign(`http://localhost:9009/#/result/${url.id}`);
        }
      });
    } else {
      seeResultButton.addEventListener('click', () => {
        window.location.assign(`http://localhost:9009/#/result/${url.id}`);
      });
    }
  },
};

export default Status;
