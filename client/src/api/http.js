import axios from 'axios';

const SERVER_DOMEN = 'http://localhost:3000';

const HTTP = {

  get(url) {
    return axios.get(SERVER_DOMEN + url);
  },

  post(url, data) {
    return axios.post(SERVER_DOMEN + url, data);
  },

  put(url, data) {
    return axios.put(SERVER_DOMEN + url, data);
  },

  delete(url) {
    return axios.delete(SERVER_DOMEN + url);
  },
};

export default HTTP;
