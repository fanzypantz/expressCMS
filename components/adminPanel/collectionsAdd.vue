<template>
  <form id="admin-form" class="admin-container">
    <div class="admin-content">
      <button @click="submitData" type="submit">Save</button>
    </div>

    <div class="admin-content"></div>
  </form>
</template>

<script>
// import axios from 'axios';

export default {
  data() {
    return {
      collection: null,
      schema: null,
      modelConfig: null
    };
  },

  mounted() {
    // Require the config files dynamically based on the route name
  },

  methods: {
    // async submitData(e) {
    //   e.preventDefault();
    //   const url =
    //     (process.env.APP_URL || 'http://localhost:4000') +
    //     '/api/admin/collections/' +
    //     this.$route.params.name +
    //     '/create';
    //   const response = await axios.post(url, { data: this.collection });
    //   if (response.data.success) {
    //     this.$nuxt.$router.replace({
    //       path: '/collections/' + this.$route.params.name + '?mode=read'
    //     });
    //   } else if (response.data.errors) {
    //     // TODO Change this to proper error handeling
    //     console.log('errors: ', response.data.errors);
    //   }
    // }
  }
};
</script>

<style lang="scss"></style>
