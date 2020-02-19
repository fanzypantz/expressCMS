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

  methods: {}
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
