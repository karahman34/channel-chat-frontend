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
        <span class="card-text-title">Register</span>

        <!-- App Title -->
        <span>{{ appTitle }}</span>
      </v-card-title>

      <v-card-text>
        <!-- The Form -->
        <v-form @submit.prevent="goRegister">
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

          <!-- Password Confirmation -->
          <v-text-field
            label="Password Confirmation"
            type="password"
            prepend-inner-icon="mdi mdi-lock"
            v-model="form.password_confirmation"
            :error-messages="errors.password_confirmation"
          ></v-text-field>

          <!-- Footer -->
          <div
            id="login-card-footer"
            class="d-flex justify-space-between"
            :class="{ 'mt-2': errors.password }"
          >
            <!-- Login Button -->
            <v-btn text color="indigo" :to="{ name: 'Login' }"
              >Already have an account</v-btn
            >

            <!-- Register Button -->
            <v-btn
              type="submit"
              color="indigo darken-1 white--text"
              :disabled="loading"
              >Register</v-btn
            >
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import userApi from "@/api/userApi";
import { hideValidationErrors, showValidationErrors } from "@/helpers/form";
import { mapMutations } from "vuex";
import { applyToken } from "@/plugins/http";

export default {
  data() {
    return {
      form: {
        username: null,
        password: null,
        password_confirmation: null
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
    ...mapMutations("auth", {
      setUser: "SET_USER",
      setLoggedIn: "SET_LOGGED_IN"
    }),
    async goRegister() {
      this.loading = true;
      hideValidationErrors(this.errors);

      try {
        const res = await userApi.register(this.form);
        const { ok, data } = res.data;

        if (!ok) throw new Error();

        const { access_token, user, expired_in } = data;

        // Set status log in
        this.setUser(user);
        this.setLoggedIn(true);

        // Apply token to http
        applyToken(`Bearer ${access_token}`, expired_in);

        // Go to home
        window.location.href = "/";
      } catch (err) {
        const statusCode = parseInt(err?.response?.status);

        switch (statusCode) {
          case 422:
            showValidationErrors(this.errors, err.response.data);
            break;

          default:
            this.alert = "Failed to register user,please try again later.";
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
