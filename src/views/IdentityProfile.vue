<template>
  <div class="container-fluid">
    <div
      class="page-header min-height-300 border-radius-xl mt-4"
      style="
        /* background-image: url('https://images.unsplash.com/photo-1531512073830-ba890ca4eba2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'); */
      "
    >
      <span class="mask bg-gradient opacity-6" style="background-color: #eb6995;"></span>
    </div>
    <div class="card card-body mx-3 mx-md-4 mt-n6">
      <div class="row gx-4">
        <div class="col-auto">
          <div class="avatar avatar-xl position-relative">
            <!-- <img class="shadow-sm w-100 border-radius-lg" v-bind:src="'data:image/jpeg;charset=utf-8;base64,'+imageUrl"/> -->
            <img
              src="@/assets/img/profileimgae.jpg"
              alt="profile_image"
              class="shadow-sm w-100 border-radius-lg"
            />
          </div>
        </div>
        <div class="col-auto my-auto">
          <div class="h-100">
            <!-- <div v-for="(value, key) in info"> -->
              <h5 class="mb-1 text-start">{{ info['name'] }}</h5>
              <p class="mb-0 font-weight-normal text-sm-start">HYHS / student</p>
              <p class="mb-0 font-weight-normal text-sm-start">{{ info['number'] }}</p>  
            <!-- </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import ProfileInfoCard from "./components/ProfileInfoCard.vue";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";
import apiClient from '@/main.js';

export default {
  name: "Error",
  data() {
    return {
      showMenu: false,
      ids:sessionStorage.getItem('userid'),
      info :'',
      imageUrl: null,

    };
  },
  components: {
    ProfileInfoCard,
  },

  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();
    this.sendid();
  },
  methods:{
    sendid: function(){
      // console.log(sessionStorage.getItem('userid'))
      apiClient.post('https://port-0-flask22-754g42aluyx17vx.sel5.cloudtype.app/api/identity/'+this.ids,{
      },{ withCredentials: true }).then(response => {
        // console.log(response)
        this.info = response.data
        this.imageUrl = response.data.image
      })
    },
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
};
</script>
