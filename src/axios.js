import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://port-0-flask22-754g42aluyx17vx.sel5.cloudtype.app/' // 여기에 기본 URL을 설정합니다.
});

export default instance;
