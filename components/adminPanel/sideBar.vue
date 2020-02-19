<template>
  <nav class="side-bar">
    <nuxt-link :to="'/home/'" class="btn">Home</nuxt-link>
    <nuxt-link
      :to="{ path: '/collections/' + name, query: { mode: 'read' } }"
      v-for="name in $options.collections.names"
      :key="name"
      class="btn"
      >{{ name }}</nuxt-link
    >
    <nuxt-link :to="'/addCollection/'" class="btn"
      >Collection Builder</nuxt-link
    >
  </nav>
</template>

<script>
import COLLECTIONS from '~/api/collections/collections';

export default {
  collections: COLLECTIONS,

  methods: {}
};
</script>

<style lang="scss">
.side-bar {
  position: absolute;
  top: 0;
  left: 0;
  width: $sideBarWidth;
  background-color: $bg;
  min-height: calc(100vh - #{$navHeight});
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
