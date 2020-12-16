import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import http, {
  tokenName,
  expiredName,
  removeToken,
  applyToken
} from "./plugins/http";

// Initialize laravel echo
import "./plugins/echo";

Vue.config.productionTip = false;

Vue.use(http);

const initializeApp = () => {
  // Remove body loading
  document.querySelector("#app").innerHTML = "";

  // Router guard
  router.beforeEach((to, from, next) => {
    // Auth State
    const { loggedIn } = store.state.auth;

    // Middlewares
    const { guest, auth } = to.meta;

    if (guest === true && loggedIn) return router.push({ name: "Home" });
    if (auth === true && !loggedIn) return router.push({ name: "Login" });

    // Set window title
    const title = to.meta?.title;
    const appTitle = process.env.VUE_APP_TITLE;
    document.title = title ? `${title} | ${appTitle}` : appTitle;

    // Next
    next();
  });

  // Create vue
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount("#app");
};

// Seeding vuex
(() => {
  // Set body loading
  document.querySelector("#app").innerHTML = "Loading...";

  // Check auth token
  const authToken = localStorage.getItem(tokenName);
  let tokenExpiredDate = localStorage.getItem(expiredName);

  if (!tokenExpiredDate || !authToken) return initializeApp();

  const dateNow = new Date();
  tokenExpiredDate = new Date(tokenExpiredDate);

  if (dateNow > tokenExpiredDate) {
    removeToken();
    return initializeApp();
  }

  // Get user credentials
  applyToken();
  store
    .dispatch("auth/getMe")
    .then(() => {
      store.commit("auth/SET_LOGGED_IN", true);
      initializeApp();
    })
    .catch(() => {
      removeToken();
      initializeApp();
    });
})();
