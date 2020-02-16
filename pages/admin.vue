<template>
  <div class="container">
    <h1 @click="test">Test</h1>
  </div>
</template>

<script>
export default {
  middleware: 'auth',

  data() {
    return {};
  },

  created() {},

  methods: {
    async test() {
      // eslint-disable-next-line no-unused-vars
      const test = await this.$axios.get('/api/admin/test');
    }
  }
};
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
