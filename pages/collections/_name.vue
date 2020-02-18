<template>
  <div class="container">
    <SideBar></SideBar>
    <CollectionsCreate
      v-if="this.$route.query.mode === 'create'"
    ></CollectionsCreate>
    <CollectionsRead v-if="this.$route.query.mode === 'read'"></CollectionsRead>
    <CollectionsUpdate
      v-if="this.$route.query.mode === 'update'"
    ></CollectionsUpdate>
  </div>
</template>

<script>
import SideBar from '~/components/adminPanel/sideBar';
import CollectionsCreate from '~/components/adminPanel/collectionsCreate';
import CollectionsRead from '~/components/adminPanel/collectionsRead';
import CollectionsUpdate from '~/components/adminPanel/collectionsUpdate';

export default {
  middleware: 'auth',

  components: {
    SideBar,
    CollectionsCreate,
    CollectionsRead,
    CollectionsUpdate
  },

  data() {
    return {};
  },

  mounted() {},

  methods: {}
};
</script>

<style lang="scss">
table {
  color: $main;
  width: 100%;
  height: 100%;
}
</style>
