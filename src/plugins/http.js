import Axios from "axios";

const http = Axios;

const tokenName = "auth.token";
const expiredName = "auth.expired_at";

// Set base url
http.defaults.baseURL = "http://localhost:8000/api";

function applyToken(token, expiredIn) {
  http.defaults.headers["Authorization"] = token;

  // Store token
  localStorage.setItem(tokenName, token);

  const date = new Date();
  date.setSeconds(expiredIn);

  // Store expired date
  localStorage.setItem(expiredName, date);
}

function removeToken() {
  delete http.defaults.headers["Authorization"];

  localStorage.removeItem(tokenName);
  localStorage.removeItem(expiredName);
}

export { http, applyToken, removeToken, tokenName, expiredName };

export default {
  plugin: Vue => {
    Vue.$prototype.$http = http;
  }
};
