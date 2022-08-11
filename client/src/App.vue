<template>
  <div id="app">
    <LoadingScreen v-if="this.httpStatus == 0" />
    <SystemMessages />
    <router-view :key="$route.path" />
  </div>
</template>

<script>
import SystemMessages from "@/components/global/SystemMessages.vue";
import LoadingScreen from "@/components/global/LoadingScreen.vue";
import { mapState } from "vuex";
import AOS from "aos";

export default {
  name: "App",
  components: {
    SystemMessages,
    LoadingScreen
  },
  computed: {
    ...mapState({
      httpStatus: state => state.httpStatus,
      isLoggedIn: state => state.isLoggedIn,
      adminLoggedIn: state => state.adminLoggedIn,
      serverError: state => state.serverError
    })
  },
  watch: {
    //if the user session is expired => redirect to login page
    '$store.state.isLoggedIn': function() {
      if (!this.isLoggedIn) {
        console.log('test FALSE case');
        this.$router.push("/login").catch(() => { return; });
      }
      else if (this.isLoggedIn) {
        console.log('test TRUE case');
      }

      //if the value is null either redirect to author
      if (!this.isLoggedIn && this.$route.path == "/author") {
        this.$router.push("/author").catch(() => { return; });
        console.log('SPECIFIC IF');
      }

      //if the page does not exist => redirect to notfound page
      if (!this.isLoggedIn && this.$route.name == "NotFound") {
        this.$router.push({ name: "NotFound" }).catch(() => { return; });
        console.log('SPECIFIC IF');
      }
    },

    //if the admin user session is expired => redirect to admin login page
    '$store.state.adminLoggedIn': function() {
      if (!this.adminLoggedIn) {
        this.$router.push("/admin").catch(() => { return; });
      }
      else if (this.adminLoggedIn) {
        return;
      }
    },

    //if there is a server error => redirect to 500 error page
    '$store.state.serverError': function() {
      if (this.serverError) {
        this.$router.push({ name: "ServerError" }).catch(() => { return; });
      }
      else if (!this.serverError) {
        return;
      }
    },

    //routes by status of user
    $route (to) {
      if (to.path === '/login' && this.isLoggedIn) {
        this.$router.push({ name: 'UserInterface'}).catch(() => { return; });
      }

      if (to.path === '/admin' && this.adminLoggedIn) {
        this.$router.push({ name: 'AdminPanel'}).catch(() => { return; });
      }

      if (to.path === '/adminpanel' && !this.adminLoggedIn) {
        this.$router.push({ name: 'AdminLogin'}).catch(() => { return; });
      }

      if (to.path === '/userinterface' && !this.isLoggedIn) {
        console.log('router FALSE case');
        this.$router.push({ name: 'Login'}).catch(() => { return; });
      }
    }
  },
  mounted() {
    window.addEventListener("load", AOS.refresh);
  }
}
</script>

<style lang="scss">
#app {
  font-family: $c-main-font;
  margin: 0;
  padding: 0;
}

*, *::before, *::after {
  box-sizing: border-box;
}

body {
  overflow-x: hidden;
  padding: 0;
  margin: 0;

  .wrapper {
    width: 1170px;
    height: 100%;
    padding: 0 15px;
    margin: 0 auto;
  }
}

::-webkit-scrollbar {
  width: 10px;
}

::-webkit-scrollbar-track {
  border-radius: 20px;
  background-color: $c-6;
}

::-webkit-scrollbar-thumb {
  background-color: $c-green-theme;
  border-radius: 20px;
}
</style>
