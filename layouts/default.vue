<template>
  <div>
    <navbar></navbar>
    <login v-if="$store.state.auth.isLoggingIn"></login>
    <signup v-if="$store.state.auth.isSigningUp"></signup>
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
  },

  mounted() {
    this.getUser();
  },

  methods: {
    async getUser() {
      // Don't try and get the user if you are on an auth page
      if (!this.$nuxt.$route.path.includes('auth')) {
        const user = await this.$axios.get('/api/user_data');
        if (user.data.email !== undefined) {
          this.$store.commit('auth/setUser', user.data);
        }
      }
    }
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
.container {
  position: relative;
}
</style>
