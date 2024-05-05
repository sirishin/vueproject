import { createApp } from "vue";
import App from "./App.vue";
import store from "./store";
import router from "./router/index";
// import "./assets/css/nucleo-icons.css";
// import "./assets/css/nucleo-svg.css";
import MaterialDashboard from "./material-dashboard";
import axios from "axios";


// import 'gitart-vue-dialog/dist/style.css'
// import { GDialog } from 'gitar/t-vue-dialog'
// import { plugin as dialogPlugin } from 'gitart-vue-dialog'


const appInstance = createApp(App);

appInstance.use(store);
appInstance.use(router);
appInstance.use(MaterialDashboard);

// appInstance.component('GDialog', GDialog)
// appInstance.use(dialogPlugin)
axios.defaults.withCredentials = true

appInstance.mount("#app");


// "glightbox": "^3.2.0",


    // "vue-easy-lightbox": "^1.16.0",
    // "vue-json-viewer": "^3.0.4",
        // "vue-simple-websocket": "^1.0.0",
    // "vue-simple-ws": "^1.0.1",
