<template>
  <div class="admin-container">
    <div class="admin-content">
      <nuxt-link
        :to="{
          path: '/collections/' + $route.params.name,
          query: { mode: 'create' }
        }"
        class="btn"
        >Add new {{ $route.params.name }}</nuxt-link
      >
    </div>

    <div v-if="collection !== null" class="admin-content">
      <table v-if="collection !== null && modelConfig !== null">
        <tr>
          <th
            v-if="modelConfig[key].showInTable"
            v-for="(value, key) in collection[0]"
          >
            {{ key }}
          </th>
        </tr>
        <tr v-for="row in collection">
          <td v-if="modelConfig[key].showInTable" v-for="(item, key) in row">
            <nuxt-link
              :to="{
                path: '/collections/' + $route.params.name,
                query: { mode: 'update', id: item }
              }"
              v-if="key === '_id'"
              ><div>
                {{ item }}
              </div>
            </nuxt-link>
            <div v-else>{{ item }}</div>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      collection: null,
      schema: null,
      modelConfig: null
    };
  },

  mounted() {
    // Get all of type when you load in
    // Could not prefetch the route params
    this.getAll();

    // Require the config files dynamically based on the route name
    this.modelConfig = require('~/api/collections/' +
      this.$route.params.name +
      '/config/config.json');
  },

  methods: {
    async getAll() {
      const url =
        (process.env.APP_URL || 'http://localhost:4000') +
        '/api/admin/collections/' +
        this.$route.params.name +
        '/getAll';
      const response = await axios.get(url);
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
