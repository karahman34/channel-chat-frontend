<template>
  <v-app>
    <v-main>
      <v-container id="layout-container" style="margin-top:15px;">
        <!-- Top Nav -->
        <top-nav class="mb-3"></top-nav>

        <!-- Slot -->
        <slot></slot>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import TopNav from "./TopNav";

export default {
  components: {
    TopNav
  },

  created() {
    this.$vuetify.theme.dark = true;
  }
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 1264px) {
  #layout-container {
    padding: 0 15% !important;
  }
}

@media screen and (min-width: 1904px) {
  #layout-container {
    padding: 0 25% !important;
  }
}
</style>
