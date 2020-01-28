<template>
  <div 
    id="app"
    :checkAuth="authRedirect"
  >
    <Notification/>
    <router-view/>
  </div>
</template>

<script>
import Notification from './components/elements/notification';
import { isatty } from 'tty';

export default {
  name: "App",
  components: {
    Notification
  },
  created() {
    this.$store.commit("LOAD_AUTH");
  },
  computed: {
    authRedirect() {
      const path = this.$route.path;
      const isAuth = this.$store.state.auth.accessToken;
      const token = isAuth ? isAuth.token : null;

      if (path.indexOf("/auth") !== -1 && !!isAuth && !!token) {
        this.$router.push("/dashboard");
      } else if (path.indexOf("/dashboard") !== -1  && !isAuth) {
        this.$router.push("/auth");
      } 
    }
  }
}
</script>

<style lang="scss">
body {
  position: relative;
  width: 100vw;
  min-height: 100vh;
  padding: 0;
  margin: 0;
}

#app {
  position: absolute;
  display: flex;
  width: 100%;
  height: 100%;
  font-family: sans-serif;
  text-align: center;
  color: #2c3e50;
  background: #bbcfeb;
}
</style>
