<template>
  <div>
    <!-- Alert -->
    <v-alert v-if="alertModel" :type="alert.type" dismissible>
      {{ alert.message }}
    </v-alert>

    <!-- Card -->
    <v-card>
      <v-card-title>
        <v-icon>mdi mdi-lock</v-icon>
        <span class="ml-2">Change Password</span>
      </v-card-title>

      <v-card-text>
        <v-form @submit.prevent="changePassword">
          <!-- Old Password -->
          <v-text-field
            v-model="form.old_password"
            type="password"
            label="Old Password"
            prepend-inner-icon="mdi mdi-lock"
            :error-messages="errors.old_password"
          ></v-text-field>

          <!-- New Password -->
          <v-text-field
            v-model="form.password"
            type="password"
            label="New Password"
            prepend-inner-icon="mdi mdi-lock"
            :error-messages="errors.password"
          ></v-text-field>

          <!-- Old Password -->
          <v-text-field
            v-model="form.password_confirmation"
            type="password"
            label="Password Confirmation"
            prepend-inner-icon="mdi mdi-lock"
            :error-messages="errors.password_confirmation"
          ></v-text-field>

          <div class="d-flex justify-end">
            <!-- Update Button -->
            <v-btn type="submit" color="success" :loading="loading">
              <v-icon>mdi mdi-pencil</v-icon>
              <span class="ml-1">Update</span>
            </v-btn>
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { hideValidationErrors, showValidationErrors } from "@/helpers/form";
import userApi from "@/api/userApi";

export default {
  props: {
    auth: {
      type: Object,
      required: true
    }
  },

  data() {
    return {
      form: {
        old_password: null,
        password: null,
        password_confirmation: null
      },
      errors: {
        old_password: null,
        password: null,
        password_confirmation: null
      },
      loading: false,
      alert: {
        type: null,
        message: null,
        value: false
      },
      alertModel: false
    };
  },

  watch: {
    alert: {
      deep: true,
      handler(alert) {
        this.alertModel = alert.type && alert.message ? true : false;
      }
    }
  },

  methods: {
    getFormData() {
      const { old_password, password, password_confirmation } = this.form;
      const fd = new FormData();
      fd.append("_method", "PATCH");
      fd.append("old_password", old_password);
      fd.append("password", password);
      fd.append("password_confirmation", password_confirmation);

      return fd;
    },
    async changePassword() {
      this.loading = true;
      hideValidationErrors(this.errors);

      this.alert = {
        type: null,
        message: null
      };

      try {
        const res = await userApi.changePassword(
          this.auth.id,
          this.getFormData()
        );
        const { ok } = res.data;

        if (!ok) throw new Error();

        this.alert = {
          type: "success",
          message: "Password changed."
        };
      } catch (err) {
        const statusCode = parseInt(err?.response?.status);

        switch (statusCode) {
          case 422:
            showValidationErrors(this.errors, err.response.data);
            break;

          case 401:
            this.alert = {
              type: "error",
              message: "The old password doesn't match."
            };
            break;

          default:
            this.alert = {
              type: "error",
              message: "Failed to change user password, please try again later."
            };
            break;
        }
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>
