<template>
  <v-form @submit.prevent="sendMessage">
    <v-text-field
      v-model="input"
      solo
      hide-details
      ref="chatInput"
      label="message..."
      append-icon="mdi mdi-send"
      @click:append="sendMessage"
      :disabled="loading"
    ></v-text-field>

    <button class="d-none" type="submit"></button>
  </v-form>
</template>

<script>
import channelApi from "@/api/channelApi";

export default {
  props: {
    channel: {
      type: Number,
      default: null
    },
    props: {
      auth: {
        type: Object,
        required: true
      }
    }
  },

  data() {
    return {
      input: null,
      loading: false
    };
  },

  methods: {
    async sendMessage() {
      try {
        // Set loading
        this.loading = true;

        // Emit an event
        await channelApi.newMessage(this.channel, {
          message: this.input
        });

        this.input = null;
      } catch (err) {
        alert("Failed to send message,please try again later.");
      } finally {
        this.loading = false;
        this.$nextTick(() => this.$refs.chatInput.focus());
      }
    }
  }
};
</script>
