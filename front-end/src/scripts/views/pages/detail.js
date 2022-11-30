import UrlParser from '../../routes/url-parser';
import FavoriteMovieIdb from '../../data/favorite-movie-idb';
import {
  createRoomDetailTemplate,
} from '../templates/template-creator';

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
  },
};

export default Detail;
