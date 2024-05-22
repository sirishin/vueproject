import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL // 여기에 기본 URL을 설정합니다.
});

export default instance;
