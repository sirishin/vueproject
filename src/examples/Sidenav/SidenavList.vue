<template>
  <div
    class="w-auto h-auto collapse navbar-collapse max-height-vh-100 h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <a @click="tSidebar">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="Main"
          navText="익명 게시판"
          style="font-weight: bold;"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">rate_review</i>
          </template>
        </sidenav-collapse>
      </a>
      </li>
      
      <li class="nav-item">
        <a @click="tSidebar">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="Imageboard"
          navText="사진 게시판"
          style="font-weight: bold;"
          >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">burst_mode</i>
          </template>
        </sidenav-collapse>
        </a>
      </li>
      <li class="nav-item">
        <a @click="tSidebar">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="TreauserHunter"
          navText="이벤트"
          style="font-weight: bold;"
          >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">assistant</i>
          </template>
        </sidenav-collapse>
        </a>
      </li>
      <li class="nav-item">
        <a @click="tSidebar">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="Weather"
          navText="날씨"
          style="font-weight: bold;"
          >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">wb_cloudy</i>
          </template>
        </sidenav-collapse>
        </a>
      </li>
      <li class="nav-item">
        <a @click="tSidebar">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="Lunch"
          navText="급식"
          style="font-weight: bold;"
          >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">restaurant_menu</i>
          </template>
        </sidenav-collapse>
        </a>
      </li>
      <li class="mt-3 nav-item">
        <h6
          class="text-xs ps-4 text-uppercase font-weight-bolder text-white"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          OPTION
        </h6>
      </li>
      <li class="nav-item">
        <a @click="tSidebar">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="Donate"
          navText="후원"
          style="font-weight: bold;"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">credit_card</i>
          </template>
        </sidenav-collapse>
        </a>
      </li>
      <li class="nav-item">
        <a @click="tSidebar">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="Jireoi"
          navText="미니 게임"
          style="font-weight: bold;"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">videogame_asset</i>
          </template>
        </sidenav-collapse>
        </a>
      </li>
      <li class="nav-item">
        <a @click="tSidebar">
        <sidenav-collapse
          url="#"
          :aria-controls="''"
          v-bind:collapse="false"
          collapseRef="IdentityProfile"
          navText="나의 프로필"
          style="font-weight: bold;"
        >
          <template v-slot:icon>
            <i class="material-icons-round opacity-10 fs-5">face</i>
          </template>
        </sidenav-collapse>
        </a>
      </li>
    </ul>
      <div class="mx-3">
        <a @click="tSidebar">
        <router-link to="/Login" class="btn mt-4 w-100" :class="`bg-gradient`" style="background-color: #eb6995; color: aliceblue;">LOGIN/SIGNUP</router-link>
          </a>
      </div>
  </div>
</template>
<script>
import SidenavCollapse from "./SidenavCollapse.vue";
import { mapMutations } from "vuex";

export default {
  name: "SidenavList",
  props: {
    cardBg: String
  },
  data() {
    return {
      title: "Soft UI Dashboard PRO",
      controls: "dashboardsExamples",
      isActive: "active"
    };
  },
  components: {
    SidenavCollapse
  },
  methods: {
    ...mapMutations(["navbarMinimize"]),

    tSidebar() {
      this.navbarMinimize();
      console.log(1)
    },
  }
};
</script>
