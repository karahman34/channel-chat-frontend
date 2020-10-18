<template>
  <v-app id="auth-layout">
    <v-main>
      <v-container>
        <div class="local-container">
          <!-- Slot -->
          <slot></slot>
        </div>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#auth-layout {
  background-color: #f1f1f1 !important;
}
</style>

<style lang="scss">
.card-text-title::after {
  content: "";
  display: block;
  margin-top: 3px;
  width: 45%;
  height: 3px;
  background-color: #3949ab;
}

.local-container {
  margin-top: 70px !important;
}

@media screen and (min-width: 950px) {
  .local-container {
    width: 500px;
    margin: 0 auto;
  }
}
</style>
