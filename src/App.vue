<template>
  <div>
    <Navbar v-show="navbarHandler" />
    <v-main>
      <router-view />
    </v-main>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar.vue"

export default {
  name: "App",
  components: {
    Navbar
  },
  computed: {
      navbarHandler: function() {
        let navbar = localStorage.getItem('navbar')
        return navbar !== '' ? true : false ;
      }
  }

};
</script>