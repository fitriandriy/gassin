import CONFIG from '../../globals/config';

const createInputForm = () => `
  <input type="date" name="days-and-date" id="days-and-date">
`;

const createRoomNameInputForm = () => `
  <div>
    <input type="text" name="user-name" id="user-name">
  </div>
  <div>
    <input type="text" name="rooms-name" id="rooms-name">
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
        <input type="time" id="startTimeOnDate${date.slice(0, 10)}">
        <input type="time" id="finishTimeOnDate${date.slice(0, 10)}">
      </div>
      <div class="start-to-finish">
        <input type="time" id="startTimeOnDate${date.slice(0, 10)}">
        <input type="time" id="finishTimeOnDate${date.slice(0, 10)}">
      </div>
      <div class="start-to-finish">
        <input type="time" id="startTimeOnDate${date.slice(0, 10)}">
        <input type="time" id="finishTimeOnDate${date.slice(0, 10)}">
      </div>
      <div class="start-to-finish">
        <input type="time" id="startTimeOnDate${date.slice(0, 10)}">
        <input type="time" id="finishTimeOnDate${date.slice(0, 10)}">
      </div>
      <div class="start-to-finish">
        <input type="time" id="startTimeOnDate${date}">
        <input type="time" id="finishTimeOnDate${date}">
      </div>
    </div>
  </form>
`;

const createMovieDetailTemplate = (movie) => `
  <h2 class="movie__title">${movie.title}</h2>
  <img class="movie__poster" src="${CONFIG.BASE_IMAGE_URL + movie.poster_path}" alt="${movie.title}" />
  <div class="movie__info">
  <h3>Information</h3>
    <h4>Tagline</h4>
    <p>${movie.tagline}</p>
    <h4>Release Date</h4>
    <p>${movie.release_date}</p>
    <h4>Duration</h4>
    <p>${movie.runtime} minutes</p>
    <h4>Rating</h4>
    <p>${movie.vote_average}</p>
  </div>
  <div class="movie__overview">
    <h3>Overview</h3>
    <p>${movie.overview}</p>
  </div>
`;

const createMovieItemTemplate = (movie) => `
  <div class="movie-item">
    <div class="movie-item__header">
      <img class="movie-item__header__poster" alt="${movie.nama_room}"
           src="${movie.backdrop_path ? CONFIG.BASE_IMAGE_URL + movie.backdrop_path : 'https://picsum.photos/id/666/800/450?grayscale'}">
    </div>
    <div class="movie-item__content">
      <h3><a href="/#/detail/${movie.id}">${movie.nama_room}</a></h3>
      <p>${movie.id_room}</p>
    </div>
  </div>
`;

const createLikeButtonTemplate = () => `
  <button aria-label="like this movie" id="likeButton" class="like">
    <i class="fa fa-heart-o" aria-hidden="true"></i>
  </button>
`;

const createLikedButtonTemplate = () => `
  <button aria-label="unlike this movie" id="likeButton" class="like">
    <i class="fa fa-heart" aria-hidden="true"></i>
  </button>
`;

export {
  createRoomNameInputForm,
  createInputForm,
  createRoomDetailTemplate,
  createMovieItemTemplate,
  createMovieDetailTemplate,
  createLikeButtonTemplate,
  createLikedButtonTemplate,
};
