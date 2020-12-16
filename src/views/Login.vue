<template>
  <div>
    <!-- The Alert -->
    <v-alert v-if="alert" type="error">
      {{ alert }}
    </v-alert>

    <!-- The Card -->
    <v-card id="login-card" elevation="8">
      <v-card-title class="d-flex justify-space-between align-center">
        <!-- Title -->
        <span class="card-text-title">Login</span>

        <!-- App Title -->
        <span>{{ appTitle }}</span>
      </v-card-title>

      <v-card-text>
        <!-- The Form -->
        <v-form @submit.prevent="goLogin">
          <!-- Username -->
          <v-text-field
            label="Username"
            prepend-inner-icon="mdi mdi-account"
            v-model="form.username"
            :error-messages="errors.username"
          ></v-text-field>

          <!-- Password -->
          <v-text-field
            label="Password"
            type="password"
            prepend-inner-icon="mdi mdi-lock"
            v-model="form.password"
            :error-messages="errors.password"
          ></v-text-field>

          <!-- Footer -->
          <div
            id="login-card-footer"
            class="d-flex justify-space-between"
            :class="{ 'mt-2': errors.password }"
          >
            <!-- Register Button -->
            <v-btn text color="indigo" :to="{ name: 'Register' }"
              >Create new account</v-btn
            >

            <!-- Login Button -->
            <v-btn
              type="submit"
              color="indigo darken-1 white--text"
              :disabled="loading"
              >Login</v-btn
            >
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { hideValidationErrors, showValidationErrors } from "@/helpers/form";

export default {
  data() {
    return {
      form: {
        username: null,
        password: null
      },
      errors: {
        username: null,
        password: null
      },
      loading: false,
      alert: null
    };
  },

  computed: {
    appTitle() {
      return process.env.VUE_APP_TITLE;
    }
  },

  methods: {
    ...mapActions("auth", {
      loginAction: "login"
    }),
    async goLogin() {
      this.loading = true;
      hideValidationErrors(this.errors);

      try {
        // Dispatch login action
        await this.loginAction(this.form);

        // Go to home
        const homeRoute = process.env.VUE_APP_URL;
        window.location.href = `${homeRoute}/`;
      } catch (err) {
        const statusCode = parseInt(err?.response?.status);

        switch (statusCode) {
          case 422:
            showValidationErrors(this.errors, err.response.data);
            break;

          case 401:
            this.alert = "Username or Password is invalid.";
            break;

          default:
            this.alert = "Failed to authenthicate user,please try again later.";
            break;
        }
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#app-title {
  font-weight: 500;
  font-size: 25px;
  margin-bottom: 5px;
}
</style>
