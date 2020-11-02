<template>
  <div class="d-flex justify-space-between align-center">
    <!-- App Title -->
    <span v-if="$route.fullPath === '/'" id="app-title">
      {{ appTitle }}
    </span>

    <!-- Go Back Home -->
    <router-link v-else to="/" id="btn-back-home">
      <v-icon>mdi mdi-arrow-left</v-icon>
      <span class="ml-2">Profile</span>
    </router-link>

    <!-- Right -->
    <div class="d-flex justify-space-between align-center">
      <!-- Avatar & Username -->
      <router-link
        v-if="user"
        :to="{ name: 'User.Profile' }"
        id="nav-profile"
        class="white--text text-decoration-none"
      >
        <v-img class="user-avatar" :src="user.avatar"></v-img>
        <span class="ml-1">{{ user.username }}</span>
      </router-link>

      <div class="divider mx-2"></div>

      <!-- Logout -->
      <div id="nav-logout" :class="{ loading: logoutLoading }" @click="logout">
        <v-icon id="icon">mdi mdi-power</v-icon>
        <span class="ml-1 white--text">Logout</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  data() {
    return {
      logoutLoading: false
    };
  },

  computed: {
    ...mapState("auth", {
      user: state => state.user
    }),
    appTitle() {
      return process.env.VUE_APP_TITLE;
    },
    headerLink() {
      const route = this.$route;
      console.log(route);
      return route;
    }
  },

  methods: {
    ...mapActions("auth", {
      logoutAction: "logout"
    }),
    async logout() {
      if (this.logoutLoading) return;
      this.logoutLoading = true;

      try {
        await this.logoutAction();

        this.$router.push({
          name: "Login"
        });
      } catch (err) {
        alert("Failed to logout");
      } finally {
        this.logoutLoading = false;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
#app-title {
  font-size: 24px;
  font-weight: 500;
  color: white;
}

#btn-back-home {
  color: white;
  font-size: 19px;
  text-decoration: none;
  border-bottom: none;
}

.divider {
  width: 2px;
  height: 15px;
  background-color: #f1f1f1;
}

#nav-profile,
#nav-logout {
  cursor: pointer;
}

#nav-logout:hover {
  * {
    color: #ef5350 !important;
  }
}

#nav-logout.loading {
  cursor: progress;

  * {
    color: #616161 !important;
  }
}

#nav-profile {
  display: flex;
  align-items: center;
  gap: 5px;

  .user-avatar {
    border-radius: 50%;
    width: 27px;
    height: 27px;
  }
}
</style>
