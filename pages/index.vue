<template>
  <div class="container">
    <h1>
      Status:
      <span v-if="status !== null">{{
        status.health ? 'Healthy' : 'Faulty'
      }}</span>
    </h1>
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
    // Call the status API
    this.getStatus();
    // Set an interval for 10 seconds to refresh it
    setInterval(() => {
      this.getStatus();
    }, 10000);
  },

  methods: {
    async getStatus() {
      const result = await this.$axios.get('/api/');
      this.status = result.data;
    }
  }
};
</script>

<style lang="scss">
.container {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
