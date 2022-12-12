import FavoriteMovieIdb from '../../data/favorite-movie-idb';
import { createMovieItemTemplate } from '../templates/template-creator';

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

    movies.forEach((movie) => {
      // const page = 'result';
      const usersDetail = JSON.parse(localStorage.getItem('detail'));
      const userStatus = JSON.parse(localStorage.getItem('status'));
      const userResult = JSON.parse(localStorage.getItem('result'));
      let page;
      if (usersDetail === null) {
        page = 'detail';
      } else if (usersDetail.includes(movie.nama_pengguna)) {
        if (userStatus === null) {
          page = 'status';
        } else if (userStatus.includes(movie.nama_pengguna)) {
          if (userResult === null) {
            page = 'result';
          } else if (userResult.includes(movie.nama_pengguna)) {
            page = 'voting';
          } else {
            page = 'result';
          }
        } else {
          page = 'status';
        }
      } else {
        page = 'detail';
      }
      moviesContainer.innerHTML += createMovieItemTemplate(movie, page);
    });
  },
};

export default Rooms;
