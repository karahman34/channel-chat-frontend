<template>
  <div>
    <!-- The Layout -->
    <component :is="layout">
      <!-- Router View -->
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import DefaultLayout from "./layouts/default/Index.vue";
import AuthLayout from "./layouts/auth/Index.vue";

export default {
  name: "App",

  components: {
    AuthLayout,
    DefaultLayout
  },

  data: () => ({
    //
  }),

  computed: {
    layout() {
      const layout = this.$route.meta?.layout || "default";

      return layout + "-layout";
    }
  }
};
</script>
