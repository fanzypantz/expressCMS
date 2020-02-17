// Private functions
const bcrypt = require('bcryptjs');

module.exports = {
  validateUsername: (username) => {
    const re = /^[a-z0-9_-]{3,45}$/;
    return re.test(username);
  },

  validateEmail: (email) => {
    const re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
  },

  validatePassword: (password) => {
    const re = /^(?=.*[\w])(?=.*[\W])[\w\W]{8,}$/;
    return re.test(password);
  },

  hashPassword: (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(10), null);
  }
};
