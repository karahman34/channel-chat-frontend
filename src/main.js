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
    // Set window title
    const title = to.meta?.title;
    const appTitle = process.env.VUE_APP_TITLE;
    document.title = title ? `${title} | ${appTitle}` : appTitle;

    // Middlewares
    const isLoggedIn = store.state.auth.loggedIn;
    const { guest, auth } = to.meta;

    if (guest === true && isLoggedIn) router.push({ name: "Home" });
    if (auth === true && !isLoggedIn) router.push({ name: "Login" });

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

  // Check token auth
  const authToken = localStorage.getItem(tokenName);
  if (!authToken) return initializeApp();

  // check token expire
  let tokenExpiredDate = localStorage.getItem(expiredName);
  if (!tokenExpiredDate) return initializeApp();

  const dateNow = new Date();
  tokenExpiredDate = new Date(tokenExpiredDate);

  if (dateNow > tokenExpiredDate) {
    removeToken();
    initializeApp();
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
