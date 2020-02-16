<template>
  <div class="auth-container">
    <form @submit="submitForm" class="auth-form" method="POST">
      <div class="form-group">
        <label for="name">Name</label>

        <div>
          <input id="name" v-model="name" type="text" name="name" autofocus />
        </div>
      </div>

      <div class="form-group">
        <label for="username">Username</label>

        <div>
          <input
            id="username"
            v-model="username"
            type="text"
            name="username"
            required
          />
        </div>
      </div>

      <div v-if="errors.username !== undefined" class="error" role="alert">
        <strong>{{ errors.username.message }}</strong>
      </div>

      <div class="form-group">
        <label for="email">E-Mail Address</label>

        <div>
          <input
            id="email"
            v-model="email"
            type="email"
            name="email"
            required
          />
        </div>
      </div>

      <div v-if="errors.email !== undefined" class="error" role="alert">
        <strong>{{ errors.email.message }}</strong>
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

      <div v-if="errors.password !== undefined" class="error" role="alert">
        <strong>{{ errors.password.message }}</strong>
      </div>

      <div class="form-group">
        <label for="confirm-password">Confirm Password</label>

        <div>
          <input
            id="confirm-password"
            v-model="confirmPassword"
            type="password"
            name="confirm-password"
            required
          />
        </div>
      </div>

      <div
        v-if="errors.confirm_password !== undefined"
        class="error"
        role="alert"
      >
        <strong>{{ errors.confirm_password.message }}</strong>
      </div>

      <div class="form-group">
        <input id="remember" type="checkbox" name="remember" />
        <label for="remember">Remember Me</label>
      </div>

      <div>
        <div>
          <button type="submit">Sign Up</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errors: {},
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  },

  mounted() {
    setTimeout(() => {
      // If already logged in redirect to index
      if (this.$store.state.user !== null) {
        this.$nuxt.$router.replace({ path: '/' });
      }
    }, 100);
  },

  methods: {
    async submitForm(e) {
      e.preventDefault();
      this.errors = {};

      if (this.password === this.confirmPassword) {
        const signup = await this.$axios.post('/api/signup', {
          name: this.name,
          username: this.username,
          email: this.email,
          password: this.password
        });
        if (signup.data.success) {
          this.$store.commit('toggleSignup');
          this.$store.commit('toggleLogin');
        } else if (signup.data.errors) {
          this.errors = signup.data.errors;
        }
      } else {
        this.errors.confirm_password = {};
        this.errors.confirm_password.message =
          'Please make sure your password match.';
        this.password = '';
        this.confirmPassword = '';
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
