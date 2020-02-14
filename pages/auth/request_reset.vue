<template>
  <div class="auth-normal">
    <form @submit="submitForm" class="auth-form" method="POST">
      <div v-if="message !== null" class="message" role="alert">
        <strong>{{ message }}</strong>
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
            autofocus
          />
        </div>
      </div>

      <div v-if="userError !== null" class="error" role="alert">
        <strong>{{ userError }}</strong>
      </div>

      <div>
        <div>
          <button type="submit">Reset Password</button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: null,
      userError: null,
      email: '',
      password: ''
    }
  },

  methods: {
    async submitForm(e) {
      e.preventDefault()
      const reset = await this.$axios.post('/api/forgot_password', {
        email: this.email
      })
      if (reset.data.success) {
        this.userError = null
        this.message = reset.data.message
      } else if (reset.data.userError) {
        this.userError = reset.data.userError
      }
    }
  }
}
</script>

<style lang="scss">
.auth-normal {
  z-index: 90;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

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
