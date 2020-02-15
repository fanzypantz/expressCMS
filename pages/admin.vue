<template>
  <div class="container">
    <h1>Status</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      status: null
    };
  },

  created() {
    this.getStatus();
  },

  methods: {
    async getStatus() {
      this.status = await this.$axios.get('/api/');
    }
  }
};
</script>

<style lang="scss">
.container {
  min-height: 100vh;
  width: 100%;
}
</style>
