<template>
  <div class="main-container">
    <navbar></navbar>
    <login v-if="$store.state.isLoggingIn"></login>
    <signup v-if="$store.state.isSigningUp"></signup>
    <nuxt />
  </div>
</template>

<script>
import Navbar from '~/components/Navbar.vue';
import Login from '~/components/auth/login.vue';
import Signup from '~/components/auth/signup.vue';
export default {
  components: {
    Navbar,
    Login,
    Signup
  }
};
</script>

<style lang="scss">
html {
  font-family: 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  color: $font-colour;
}

body {
  margin: 0;
  background: $main;
  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, $secondary, $main);
  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, $secondary, $main);
  /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  width: 100%;
  min-height: 100vh;
}

.main-container {
  overflow: auto;
  margin: 0;
  padding: 0;
  width: 100%;
  min-height: 100vh;
}

.container {
  margin-top: $navHeight;
  position: relative;
  min-height: calc(100vh - #{$navHeight});
  width: 100%;
}

.admin-container {
  margin-left: auto;
  min-height: calc(100vh - #{$navHeight});
  width: calc(100vw - #{$sideBarWidth});
}

.admin-content {
  background-color: $bg;
  width: 80%;
  margin: 20px auto;
}

#admin-form {
  color: $main;
}
</style>
