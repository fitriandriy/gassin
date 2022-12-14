import CONFIG from '../../globals/config';

const createInputForm = () => `
  <input type="date" name="days-and-date" id="days-and-date" required>
`;

const createRoomNameInputForm = () => `
  <div>
    <input type="text" name="user-name" id="user-name" required>
  </div>
  <div>
    <input type="text" name="rooms-name" id="rooms-name" required>
  </div>
`;

const createRoomDetailTemplate = (date) => `
  <form action="">
    <div id="date">
      <span>${date.slice(0, 10)}</span>
    </div>
    <div id="description">
      <span>Start from</span>
      <span>-</span>
      <span>Finish at</span>
    </div>
    <div class="time-inputs">
      <div class="start-to-finish">
        <input type="time" id="startTimeOnDate${date.slice(0, 10)}" required>
        <input type="time" id="finishTimeOnDate${date.slice(0, 10)}" required>
      </div>
    </div>
    <div class="time-inputs">
      <div class="start-to-finish">
        <input type="time" id="startTimeOnDate${date.slice(0, 10)}" required>
        <input type="time" id="finishTimeOnDate${date.slice(0, 10)}" required>
      </div>
    </div>
    <div class="time-inputs">
      <div class="start-to-finish">
        <input type="time" id="startTimeOnDate${date.slice(0, 10)}" required>
        <input type="time" id="finishTimeOnDate${date.slice(0, 10)}" required>
      </div>
    </div>
    <div class="time-inputs">
      <div class="start-to-finish">
        <input type="time" id="startTimeOnDate${date.slice(0, 10)}" required>
        <input type="time" id="finishTimeOnDate${date.slice(0, 10)}" required>
      </div>
    </div>
    <div class="time-inputs">
      <div class="start-to-finish">
        <input type="time" id="startTimeOnDate${date.slice(0, 10)}" required>
        <input type="time" id="finishTimeOnDate${date.slice(0, 10)}" required>
      </div>
    </div>
  </form>
`;

const createRoomDetailHourTemplate = (date) => `
  <div class="start-to-finish">
    <input type="time" id="startTimeOnDate${date.slice(0, 10)}" required>
    <input type="time" id="finishTimeOnDate${date.slice(0, 10)}" required>
  </div>
`;

const createUserStatusTemplate = (user) => `
  <tr>
    <td>${user.nama}</td>
    <td>${user.status}</td>
  </tr>
`;

const createResultTemplate = (result) => `
  <div class="schedule">
  <h5>${result.slice(0, 10)}</h5>
  <div class="hours">
      <div class="hour-title">
          <p>start</p>
          <p>end</p>
      </div>
  </div>
`;

const createResultTemplateHour = (result) => `
  <div class="hour">
    <input id="${result.id_hasil}" type="checkbox">
    <div><p>${result.jam_mulai}</p></div>
    <div><p>${result.jam_selesai}</p></div>
  </div>
`;

const createVotingTemplate = (result, tanggal) => `
  <tr>
    <td>${tanggal}</td>
    <td>${result.jam_mulai}</td>
    <td>${result.jam_selesai}</td>
    <td>${result.voting}</td>
  </tr>
`;

const createRoomItemTemplate = (movie, page) => `
  <div class="movie-item">
    <div class="movie-item__header">
      <img class="movie-item__header__poster" alt="${movie.nama_room}"
           src="${movie.backdrop_path ? CONFIG.BASE_IMAGE_URL + movie.backdrop_path : 'https://picsum.photos/id/666/800/450?grayscale'}">
    </div>
    <div class="movie-item__content">
      <h3><a href="/#/${page}/${movie.id}">${movie.nama_room}</a></h3>
      <p>${movie.id_room}</p>
    </div>
  </div>
`;

export {
  createRoomNameInputForm,
  createInputForm,
  createRoomDetailTemplate,
  createRoomDetailHourTemplate,
  createRoomItemTemplate,
  createUserStatusTemplate,
  createResultTemplate,
  createResultTemplateHour,
  createVotingTemplate,
};
