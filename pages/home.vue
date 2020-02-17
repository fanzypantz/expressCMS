<template>
  <div class="container">
    <SideBar></SideBar>
  </div>
</template>

<script>
import SideBar from '~/components/adminPanel/sideBar';

export default {
  middleware: 'auth',

  components: {
    SideBar
  },

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
