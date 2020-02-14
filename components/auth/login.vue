<template>
  <div class="auth-container">
    <form @submit="submitForm" class="auth-form" method="POST" novalidate>
      <div class="form-group">
        <label for="email">E-Mail Address</label>

        <div>
          <input
            id="email"
            v-model="email"
            type="email"
            name="email"
            required
            autofocus
          />
        </div>
      </div>

      <div class="form-group">
        <label for="password">Password</label>

        <div>
          <input
            id="password"
            v-model="password"
            type="password"
            name="password"
            required
          />
        </div>
      </div>

      <div class="form-group">
        <input id="remember" type="checkbox" name="remember" />
        <label for="remember">Remember Me</label>
      </div>

      <div>
        <div>
          <button type="submit">Login</button>

          <div v-if="error !== null" class="error" role="alert">
            <strong>{{ error }}</strong>
          </div>

          <a href="/auth/request_reset">Forgot Your Password?</a>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      error: null,
      email: '',
      password: ''
    };
  },

  mounted() {
    setTimeout(() => {
      // If already logged in redirect to index
      if (this.$store.state.auth.user !== null) {
        this.$nuxt.$router.replace({ path: '/' });
      }
    }, 100);
  },

  methods: {
    async submitForm(e) {
      e.preventDefault();
      const login = await this.$axios.post('/api/login', {
        email: this.email,
        password: this.password
      });
      if (login.data.success) {
        if (this.$nuxt.$route.path !== '/') {
          this.$nuxt.$router.replace({ path: '/' });
        }
        this.$store.commit('auth/setUser', login.data.user);
        this.$store.commit('auth/toggleLogin');
      } else if (login.data.error) {
        this.error = login.data.error.message;
      }
    }
  }
};
</script>

<style lang="scss">
.auth-container {
  z-index: 95;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  background-color: $transparent;

  a {
    color: $font-colour;
    display: inline-block;
    margin-top: 10px;

    &:hover {
      color: $main;
    }
  }

  .form-group {
    margin-top: 10px;
    position: relative;
    box-shadow: 4px 3px 3px 0 rgba(0, 0, 0, 0.5);

    &:first-of-type {
      margin-top: 0;
    }
  }

  input[type='checkbox'] {
    position: absolute;
    top: 50%;
    right: 20%;
    transform: translateY(-50%);
  }

  label {
    padding-left: 15px;
    width: calc(100% - 15px);
    font-size: 16px;
    line-height: 35px;
    background-color: $main;
    display: inline-block;
  }

  button {
    margin-top: 10px;
    width: 100% !important;
  }

  input[type='email'],
  input[type='text'],
  input[type='password'] {
    color: $main;
    padding-left: 15px;
    border: none;
    width: calc(100% - 15px);
    height: 35px;
  }

  .auth-form {
    width: 400px;
  }

  .error {
    color: $error;
    margin: 20px 0;
  }

  .message {
    margin: 20px 0;
  }
}
</style>
