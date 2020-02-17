<template>
  <div class="container">
    <SideBar></SideBar>
    <div class="admin-container">
      <div v-if="collection !== null" class="admin-content">
        <table>
          <tr>
            <th v-for="(value, name) in collection[0]">{{ name }}</th>
          </tr>
          <tr v-for="row in collection">
            <td v-for="item in row">{{ item }}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
// eslint-disable-next-line no-unused-vars
import axios from 'axios';
import SideBar from '~/components/adminPanel/sideBar';

export default {
  middleware: 'auth',

  components: {
    SideBar
  },

  data() {
    return {
      collection: null
    };
  },

  mounted() {
    // Get all of type when you load in
    // Could not prefetch the route params
    this.getAll();
  },

  methods: {
    async getAll() {
      const url =
        (process.env.APP_URL || 'http://localhost:4000') +
        '/api/admin/collections/' +
        this.$route.params.name +
        '/getAll';
      console.log('url: ', url);
      const response = await this.$axios.get(url);
      if (response.data.success) {
        this.collection = response.data[this.$route.params.name + 's'];
      }
    }
  }
};
</script>

<style lang="scss">
table {
  color: $main;
  width: 100%;
  height: 100%;
}
</style>
