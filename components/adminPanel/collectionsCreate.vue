<template>
  <form
    id="admin-form"
    v-if="collection !== null && modelConfig !== null && schema !== null"
    class="admin-container"
  >
    <div class="admin-content">
      <button @click="submitData" type="submit">Save</button>
    </div>

    <div class="admin-content">
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
    </div>
  </form>
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
    // Require the config files dynamically based on the route name
    this.schema = require('~/api/collections/' +
      this.$route.params.name +
      '/config/schema.json');
    this.modelConfig = require('~/api/collections/' +
      this.$route.params.name +
      '/config/config.json');

    // Create the object which is used for the model binding based on the schema config
    const editable = {};
    Object.entries(this.modelConfig).forEach(([key, val]) => {
      if (val.canEdit) {
        // TODO: -Add more fields here to support other types of values (meta)
        if (this.schema[key].type === 'Boolean') {
          editable[key] = false;
        } else {
          editable[key] = '';
        }
      }
    });
    this.collection = editable;
  },

  methods: {
    async submitData(e) {
      e.preventDefault();
      const url =
        (process.env.APP_URL || 'http://localhost:4000') +
        '/api/admin/collections/' +
        this.$route.params.name +
        '/create';
      const response = await axios.post(url, { data: this.collection });
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
