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
            <img
              src="@/assets/img/team06.jpg"
              alt="profile_image"
              class="shadow-sm w-100 border-radius-lg"
            />
          </div>
        </div>
        <div class="col-auto my-auto">
          <div class="h-100">
            <h5 class="mb-1 text-start">HEE</h5>
            <p class="mb-0 font-weight-normal text-sm-start">HYHS / student</p>
            <p class="mb-0 font-weight-normal text-sm-start">최고를 향하여</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileInfoCard from "./components/ProfileInfoCard.vue";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";

export default {
  name: "Error",
  data() {
    return {
      imageUrl: null,
      showMenu: false,
    };
  },
  components: {
    ProfileInfoCard,
  },

  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip();
  },
  beforeUnmount() {
    this.$store.state.isAbsolute = false;
  },
};
</script>
