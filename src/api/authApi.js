import { http } from "../plugins/http";

const prefix = "/auth";

export default {
  login(payload) {
    return http.post(`${prefix}/login`, payload);
  },
  me() {
    return http.get(`${prefix}/me`);
  },
  logout() {
    return http.post(`${prefix}/logout`);
  }
};
