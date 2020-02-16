<template>
  <nav class="nav">
    <a v-if="checkUser" @click="logIn" class="nav-item">Login</a>
    <a v-if="checkUser" @click="signUp" class="nav-item">Sign up</a>
    <a @click="logOut" v-if="!checkUser" class="nav-item">Log out</a>
    <a v-if="!checkUser" class="nav-item">Profile</a>
  </nav>
</template>

<script>
export default {
  computed: {
    checkUser() {
      return this.$store.state.user === null;
    }
  },

  methods: {
    async logOut(e) {
      e.preventDefault();
      const logout = await this.$axios.get('/api/logout');
      if (logout.data.success) {
        this.$store.commit('setUser', null);
        if (this.$nuxt.$route.path !== '/') {
          this.$nuxt.$router.replace({ path: logout.data.path });
        }
      }
    },

    logIn() {
      if (this.$store.state.isSigningUp) {
        this.$store.commit('toggleSignup');
      }
      this.$store.commit('toggleLogin');
    },

    signUp() {
      if (this.$store.state.isLoggingIn) {
        this.$store.commit('toggleLogin');
      }
      this.$store.commit('toggleSignup');
    }
  }
};
</script>

<style lang="scss">
.nav {
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
  position: fixed;
  top: 0;
  left: 0;
  height: $navHeight;
  width: 100%;
  background-color: $bg;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.8);
}

.nav-item {
  text-decoration: none;
  width: 140px;
  text-align: center;
  display: block;
  color: $main;
  font-weight: 700;
  height: 45px;
  line-height: 45px;

  &:hover {
    cursor: pointer;
    background: $main;
    color: $font-colour;
  }
}
</style>
