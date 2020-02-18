<template>
  <div class="container">
    <SideBar></SideBar>
    <CollectionsTable
      v-if="this.$route.query.mode === 'show'"
    ></CollectionsTable>
    <CollectionsEdit v-if="this.$route.query.mode === 'edit'"></CollectionsEdit>
  </div>
</template>

<script>
import SideBar from '~/components/adminPanel/sideBar';
import CollectionsTable from '~/components/adminPanel/collectionsTable';
import CollectionsEdit from '~/components/adminPanel/collectionsEdit';

export default {
  middleware: 'auth',

  components: {
    SideBar,
    CollectionsTable,
    CollectionsEdit
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
