/* eslint-disable no-multiple-empty-lines */
import FavoriteMovieIdb from '../../data/favorite-movie-idb';
import API_ENDPOINT from '../../globals/api-endpoint';
import { createRoomItemTemplate } from '../templates/template-creator';

const Rooms = {
  async render() {
    return `
      <div class="content">
        <h2 class="content__heading">Your Rooms</h2>
        <div id="movies" class="movies">
        </div>
      </div>
    `;
  },

  async afterRender() {
    const movies = await FavoriteMovieIdb.getAllMovies();
    const moviesContainer = document.querySelector('#movies');
    console.log(movies);
    const status = [];

    movies.forEach(async (movie) => {
      const options = {
        method: 'GET',
      };
      const response = await fetch(`${API_ENDPOINT.DETAIL_USER(movie.id_room)}`, options);
      const responseJson = await response.json();
      const responseJsonArray = responseJson.data.result;
      responseJsonArray.forEach((user) => {
        if (user.nama === movie.nama_pengguna) {
          status.push(user.status);
          if (user.status === 1) {
            moviesContainer.innerHTML += createRoomItemTemplate(movie, 'status');
          } else if (user.status === 0) {
            moviesContainer.innerHTML += createRoomItemTemplate(movie, 'detail');
          }
          console.log(`STATUS = ${status}`);
        }
      });
    });
  },
};

export default Rooms;
