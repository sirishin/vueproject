import { createRouter, createWebHistory } from "vue-router";
import Main from "../views/Main.vue";
import Login from "../views/Login.vue";
import Lunch from "../views/Lunch.vue";
import RegisterUser from "../views/RegisterUser.vue"
import Donate from "../views/Donate.vue";
import Profile from "../views/Profile.vue";
import Imageboard from "../views/imageupload.vue";
import Weather from "../views/Weather.vue";
import Businfo from "../views/Businfo.vue";
import IdentityProfile from "../views/IdentityProfile.vue";
import Jireoi from "../views/Jireoi.vue"

const routes = [
  {
    path: "/",
    name: "/",
    redirect: "/Lunch",
  },
  {
    path: "/Jireoi",
    name: "Jireoi",
    component: Jireoi,
  },
  {
    path: "/Businfo",
    name: "Bus",
    component: Businfo,
  },
  {
    path: "/IdentityProfile",
    name: "IdentityProfile",
    component: IdentityProfile,
  },
  {
    path: "/Weather",
    name: "Weather",
    component: Weather,
  },
  {
    path: "/Imageboard",
    name: "Imageboard",
    component: Imageboard,
  },
  {
    path: "/RegisterUser",
    name: "RegisterUser",
    component: RegisterUser,
  },
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Main",
    name: "Main",
    component: Main,
  },
  {
    path: "/Lunch",
    name: "Lunch",
    component: Lunch,
  },
  {
    path: "/Donate",
    name: "Donate",
    component: Donate,
  },
  {
    path: "/Profile",
    name: "Profile",
    component: Profile,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkActiveClass: "active",
});


export default router;
