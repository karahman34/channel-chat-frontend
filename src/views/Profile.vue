<template>
  <div>
    <!-- Update Profile -->
    <update-profile></update-profile>

    <!-- Update Password -->
    <update-password id="update-password" :auth="auth"></update-password>
  </div>
</template>

<script>
import UpdateProfile from "@/components/User/UpdateProfile";
import UpdatePassword from "@/components/User/UpdatePassword";
import { mapState } from "vuex";

export default {
  components: {
    UpdateProfile,
    UpdatePassword
  },

  computed: {
    ...mapState("auth", {
      auth: state => state.user
    })
  }
};
</script>

<style lang="scss" scoped>
#update-password {
  margin-top: 35px;
}
</style>
