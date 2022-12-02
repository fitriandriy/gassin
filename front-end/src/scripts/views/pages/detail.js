import UrlParser from '../../routes/url-parser';
import TheMovieDbSource from '../../data/themoviedb-source';
import { createMovieDetailTemplate } from '../templates/template-creator';
import LikeButtonInitiator from '../../utils/like-button-initiator';

const Detail = {
  async render() {
    return `
      <div class="head-room">
        <div><h1>Choose Yours Schedule</h1></div>
        <div class="room-info">
          <div><img src="../../public/room.png" alt=""></div>
          <div>
              <p>Room Id</p>
              <p>Event</p>
              <p>Username</p>
          </div>
        </div>
      </div>
      <div class="schedules">
          <div class="schedule">
              <h5>25 September 2022</h5>
              <div class="hours">
                  <div class="hour-title">
                      <p>start</p>
                      <p>end</p>
                  </div>
                  <div class="hour">
                      <input type="checkbox">
                      <input type="text">
                      <input type="text">
                  </div>
                  <div class="hour">
                      <input type="checkbox">
                      <input type="text">
                      <input type="text">
                  </div>
              </div>
          </div>
          <div class="schedule">
              <h5>26 September 2022</h5>
              <div class="hours">
                  <div class="hour-title">
                      <p>start</p>
                      <p>end</p>
                  </div>
                  <div class="hour">
                      <input type="checkbox">
                      <input type="text">
                      <input type="text">
                  </div>
                  <div class="hour">
                      <input type="checkbox">
                      <input type="text">
                      <input type="text">
                  </div>
              </div>
          </div>
      </div>
      <div class="save-button">
          <button class='button-logout'>logout</button>
          <button class='button-voting'>create voting</button>
      </div>
      <div id="movie" class="movie"></div>
      <div id="likeButtonContainer"></div>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    const movie = await TheMovieDbSource.detailMovie(url.id);
    const movieContainer = document.querySelector('#movie');
    movieContainer.innerHTML = createMovieDetailTemplate(movie);

    LikeButtonInitiator.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      movie: {
        id: movie.id,
        title: movie.title,
        overview: movie.overview,
        backdrop_path: movie.backdrop_path,
        vote_average: movie.vote_average,
      },
    });
  },
};

export default Detail;
