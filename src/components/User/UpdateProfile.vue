<template>
  <div>
    <!-- The Alert -->
    <v-alert v-model="alertModel" :type="alert.type" dismissible>
      {{ alert.message }}
    </v-alert>

    <!-- The Card -->
    <v-card>
      <v-card-title>
        <v-icon>mdi mdi-account</v-icon>
        <span class="ml-2">Edit Profile</span>
      </v-card-title>

      <v-card-text>
        <!-- The Form -->
        <v-form @submit.prevent="updateProfile">
          <!-- Username -->
          <v-text-field
            filled
            clearable
            id="username"
            label="Username"
            prepend-inner-icon="mdi mdi-account"
            v-model="form.username"
            :error-messages="errors.username"
          ></v-text-field>

          <!-- Avatar Preview -->
          <v-img
            v-if="previewAvatar"
            :src="previewAvatar"
            width="260"
            class="mb-5"
            style="border-radius:6px;"
          ></v-img>

          <!-- Avatar Input -->
          <v-file-input
            v-model="form.avatar"
            filled
            show-size
            label="Avatar"
            accept="image/*"
            :error-messages="errors.avatar"
          ></v-file-input>

          <div class="d-flex justify-end">
            <!-- Submit -->
            <v-btn type="submit" color="success" :loading="updateUserLoading">
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
import userApi from "@/api/userApi";
import { mapActions, mapState } from "vuex";
import { hideValidationErrors, showValidationErrors } from "@/helpers/form";

export default {
  data() {
    return {
      form: {
        username: null,
        avatar: null,
        password: null,
        password_confirmation: null
      },
      errors: {
        username: null,
        avatar: null,
        password: null
      },
      previewAvatar: null,
      updateUserLoading: false,
      alert: {
        type: null,
        message: null
      },
      alertModel: false
    };
  },

  computed: {
    ...mapState("auth", {
      auth: state => state.user
    })
  },

  watch: {
    "form.avatar": {
      handler(avatarFile) {
        if (avatarFile) {
          this.previewAvatar = URL.createObjectURL(avatarFile);
        }
      }
    },
    alert: {
      deep: true,
      handler(alert) {
        this.alertModel = alert.type && alert.message ? true : false;
      }
    }
  },

  mounted() {
    const { username, avatar } = this.auth;

    this.form.username = username;
    if (!this.isDefaultAvatar()) this.previewAvatar = avatar;
  },

  methods: {
    ...mapActions("auth", {
      refreshProfile: "getMe"
    }),
    isDefaultAvatar() {
      return /\/default_images\/avatar.*/.test(this.auth.avatar);
    },
    async updateProfile() {
      // Set loading & clear validations
      this.updateUserLoading = true;
      hideValidationErrors(this.errors);

      this.alert = {
        type: null,
        message: null
      };

      // Set form data
      const { username, avatar } = this.form;
      const formData = new FormData();
      formData.append("_method", "PATCH");
      formData.append("username", username);
      if (avatar) formData.append("avatar", avatar || null);

      try {
        const res = await userApi.update(this.auth.id, formData);
        const { ok } = res.data;

        if (!ok) throw new Error();

        await this.refreshProfile();

        this.alert = {
          type: "success",
          message: "User updated."
        };
      } catch (err) {
        const statusCode = parseInt(err?.response?.status);

        switch (statusCode) {
          case 422:
            showValidationErrors(this.errors, err.response.data);
            break;

          default:
            this.alert = {
              type: "error",
              message: "Failed to update user profile, please try again later."
            };
            break;
        }
      } finally {
        this.updateUserLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped></style>
