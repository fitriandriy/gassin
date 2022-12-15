import CONFIG from './config';

const API_ENDPOINT = {
  ROOM: `${CONFIG.BASE_URL_LOCAL}room`,
  DETAIL_ROOM: (id) => `${CONFIG.BASE_URL_LOCAL}room/${id}`,
  USER: `${CONFIG.BASE_URL_LOCAL}user`,
  DETAIL_USER: (id) => `${CONFIG.BASE_URL_LOCAL}user/${id}`,
  UPDATE_VOTING: (id) => `${CONFIG.BASE_URL_LOCAL}result/${id}`,
  RESULT: (id) => `${CONFIG.BASE_URL_LOCAL}room/${id}/result`,
  SCHEDULE: `${CONFIG.BASE_URL_LOCAL}user/schedule`,
};

export default API_ENDPOINT;
