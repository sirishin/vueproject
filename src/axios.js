import axios from 'axios';

// 환경 변수를 사용하여 기본 URL 설정
const instance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL
});

export default instance;
