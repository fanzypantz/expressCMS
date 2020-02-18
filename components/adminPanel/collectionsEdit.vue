<template>
  <div class="admin-container">
    <div class="admin-content">
      <form>
        <div v-for="(value, key) in schema" class="form-group">
          <label :for="key"></label>
          <input
            :id="key"
            v-if="value.type === 'String'"
            :name="key"
            type="text"
          />
        </div>
      </form>
    </div>
  </div>
</template>

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
