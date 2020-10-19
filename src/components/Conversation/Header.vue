<template>
  <div class="d-flex justify-space-between align-center" style="width: 100%;">
    <!-- Left -->
    <div>
      <p id="channel-number" class="mb-0">Channel #{{ channel || "?" }}</p>
    </div>

    <!-- Right -->
    <div class="d-flex justify-end">
      <!-- Switch Channel -->
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="changeChannel">
            <v-icon>mdi mdi-swap-horizontal</v-icon>
          </v-btn>
        </template>

        Change channel
      </v-tooltip>

      <!-- Delete -->
      <v-tooltip top>
        <template v-slot:activator="{ on }">
          <v-btn icon class="ml-2" v-on="on" @click="clearConversations">
            <v-icon>mdi mdi-trash-can</v-icon>
          </v-btn>
        </template>

        Clear conversations
      </v-tooltip>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    channel: {
      type: Number,
      default: null
    }
  },

  methods: {
    changeChannel() {
      this.$emit("change-channel");
    },
    clearConversations() {
      this.$emit("clear");
    }
  }
};
</script>
