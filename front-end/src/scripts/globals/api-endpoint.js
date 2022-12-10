import CONFIG from './config';

const API_ENDPOINT = {
  ROOM: `${CONFIG.BASE_URL_LOCAL}room`,
  DETAIL_ROOM: (id) => `${CONFIG.BASE_URL_LOCAL}room/${id}`,
  USER: (id) => `${CONFIG.BASE_URL_LOCAL}user/${id}`,
  NOW_PLAYING: `${CONFIG.BASE_URL}movie/now_playing?api_key=${CONFIG.KEY}&language=${CONFIG.DEFAULT_LANGUAGE}&page=1`,
  UPCOMING: `${CONFIG.BASE_URL}movie/upcoming?api_key=${CONFIG.KEY}&language=${CONFIG.DEFAULT_LANGUAGE}&page=1`,
  DETAIL: (id) => `${CONFIG.BASE_URL}movie/${id}?api_key=${CONFIG.KEY}`,
};

export default API_ENDPOINT;
