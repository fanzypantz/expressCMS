<template>
  <div class="container">
    <SideBar></SideBar>

    <div v-if="showCreateType" class="create-type">
      <p>Name of collection</p>
      <input v-model="createTypeName" type="text" />
      <button @click="addNewCollectionType">Add</button>
    </div>
    <div class="admin-container">
      <div class="admin-content">
        <div class="collection-types">
          <h2>Collection Types</h2>
          <ul>
            <li v-for="type in collectionTypes">{{ type }}</li>
          </ul>
          <button @click="toggleCreateModal">Add Collection Type</button>
        </div>
        <div class=""></div>
      </div>
    </div>
  </div>
</template>

<script>
import SideBar from '~/components/adminPanel/sideBar';
import axios from 'axios';
const collectionTypes = require('~/api/collections/collections.json');

export default {
  middleware: 'auth',

  components: {
    SideBar
  },

  data() {
    return {
      showCreateType: false,
      createTypeName: '',
      collectionTypes: [],
      collection: {}
    };
  },

  created() {
    this.collectionTypes = collectionTypes.names;
  },

  methods: {
    toggleCreateModal() {
      this.showCreateType = !this.showCreateType;
    },

    addNewCollectionType() {
      this.collectionTypes.push(this.createTypeName);
      // TODO: Make this async
      this.createNew(this.createTypeName);
      this.createTypeName = '';
      this.toggleCreateModal();
    },

    async createNew(name) {
      const defaultSchema = {
        created_at: {
          type: 'Date',
          default: 'Date.now'
        },
        updated_at: {
          type: 'Date',
          default: 'Date.now'
        }
      };

      const defaultConfig = {
        __v: {
          canDelete: false,
          canEdit: false,
          show: false,
          showInTable: false,
          widget: 'text'
        },
        _id: {
          canDelete: false,
          canEdit: false,
          show: true,
          showInTable: true,
          widget: 'text'
        },
        created_at: {
          canDelete: false,
          canEdit: false,
          show: true,
          showInTable: false,
          widget: 'date'
        },
        updated_at: {
          canDelete: false,
          canEdit: false,
          show: true,
          showInTable: true,
          widget: 'date'
        }
      };

      const response = await axios.post('/api/admin/addCollection', {
        name,
        defaultSchema,
        defaultConfig
      });
      if (response.data.success) {
        this.collection = response.data[this.$route.params.name + 's'];
      }
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

.collection-types {
}
.create-type {
  color: $main;
  background-color: $bg;
  width: 60%;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px 0 $transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
