import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router/index";
// import "./assets/css/nucleo-icons.css";
// import "./assets/css/nucleo-svg.css";
import MaterialDashboard from "./material-dashboard";
import axios from "axios";

axios.defaults.baseURL = 'https://port-0-flask22-754g42aluyx17vx.sel5.cloudtype.app/'; // 여기에서 기본 URL을 설정합니다.

// import 'gitart-vue-dialog/dist/style.css'
// import { GDialog } from 'gitar/t-vue-dialog'
// import { plugin as dialogPlugin } from 'gitart-vue-dialog'


const appInstance = createApp(App);

appInstance.use(store);
appInstance.use(router);
appInstance.use(MaterialDashboard);
// axios.defaults.withCredentials = true
// createApp(App).use(store);
// createApp(App).use(router);
// createApp(App).use(MaterialDashboard);
// createApp(App).mount("#app");
appInstance.mount("#app");
// new Vue({
//     router,
//     store,
//     render: h => h(App),
// }).$mount('#app')

// "glightbox": "^3.2.0",


    // "vue-easy-lightbox": "^1.16.0",
    // "vue-json-viewer": "^3.0.4",
        // "vue-simple-websocket": "^1.0.0",
    // "vue-simple-ws": "^1.0.1",
