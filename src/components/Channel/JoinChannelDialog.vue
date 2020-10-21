<template>
  <v-dialog
    v-model="dialog"
    max-width="500px"
    transition="dialog-transition"
    :persistent="persistent"
  >
    <v-card>
      <v-card-title>
        Join Channel
      </v-card-title>

      <v-card-text>
        <!-- The Form -->
        <v-form
          class="d-flex justify-center align-center"
          style="gap:20px;"
          @submit.prevent="joinChannel"
        >
          <!-- Channel input -->
          <v-text-field v-model="form.channel" label="Channel"></v-text-field>

          <!-- Join Button -->
          <v-btn type="submit" color="success" :disabled="form.channel === null"
            >Join</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    channel: {
      type: Number,
      default: null
    },
    persistent: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      dialog: true,
      form: {
        channel: null
      }
    };
  },

  watch: {
    dialog(val) {
      if (!val) this.closeDialog();
    },
    "form.channel": {
      handler(val, old) {
        if (!val) {
          return this.$nextTick(() => this.$set(this.form, "channel", null));
        }

        const pattern = /^[1-9]+([0-9]+)?$/;
        const res = pattern.test(val);
        if (res) return;

        this.$nextTick(() => this.$set(this.form, "channel", old));
      }
    }
  },

  mounted() {
    if (this.channel !== null) this.form.channel = this.channel;
  },

  methods: {
    closeDialog() {
      this.$emit("close");
    },
    joinChannel() {
      this.$emit("join", this.form.channel);
    }
  }
};
</script>
