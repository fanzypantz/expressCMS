<template>
  <div class="admin-container">
    <div class="admin-content">
      <form
        id="admin-form"
        v-if="collection !== null && modelConfig !== null && schema !== null"
      >
        <div
          v-if="modelConfig[key].show && modelConfig[key].canEdit"
          v-for="(value, key) in schema"
          class="form-group"
        >
          <label :for="key">{{ key }}</label>
          <input
            :id="key"
            v-if="modelConfig[key].widget === 'email'"
            :name="key"
            v-model="collection[key]"
            type="email"
          />
          <input
            :id="key"
            v-else-if="modelConfig[key].widget === 'boolean'"
            :name="key"
            v-model="collection[key]"
            type="checkbox"
          />
          <textarea
            :id="key"
            v-else-if="modelConfig[key].widget === 'textarea'"
            v-model="collection[key]"
            :name="key"
          ></textarea>
          <input
            :id="key"
            v-else
            :name="key"
            v-model="collection[key]"
            type="text"
          />
        </div>

        <button @click="submitData" type="submit">Save</button>
      </form>
    </div>
  </div>
</template>
// TODO: Create more widgets

<script>
import axios from 'axios';

export default {
  props: {
    collectionName: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      collection: null,
      schema: null,
      modelConfig: null
    };
  },

  computed: {},

  mounted() {
    // Fetch the current user to be edited
    this.getOne();

    // Require the config files dynamically based on the route name
    this.schema = require('~/api/collections/' +
      this.$route.params.name +
      '/config/schema.json');
    this.modelConfig = require('~/api/collections/' +
      this.$route.params.name +
      '/config/config.json');
  },

  methods: {
    async getOne() {
      const url =
        (process.env.APP_URL || 'http://localhost:4000') +
        '/api/admin/collections/' +
        this.$route.params.name +
        '/getOne';
      const response = await axios.post(url, { userId: this.$route.query.id });
      if (response.data.success) {
        this.collection = response.data[this.$route.params.name];
      }
    },

    async submitData(e) {
      e.preventDefault();
      const url =
        (process.env.APP_URL || 'http://localhost:4000') +
        '/api/admin/collections/' +
        this.$route.params.name +
        '/saveOne';
      const response = await axios.post(url, { data: this.collection });
      // If successful return to the table page
      if (response.data.success) {
        this.$nuxt.$router.replace({
          path: '/collections/' + this.$route.params.name + '?mode=read'
        });
      } else if (response.data.errors) {
        // TODO Change this to proper error handeling
        console.log('errors: ', response.data.errors);
      }
    }
  }
};
</script>

<style lang="scss"></style>
