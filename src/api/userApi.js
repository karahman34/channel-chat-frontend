import { http } from "@/plugins/http";

const prefix = "/users";

export default {
  register(payload) {
    return http.post(`${prefix}/register`, payload);
  },
  update(id, payload) {
    return http.post(`${prefix}/${id}`, payload);
  },
  changePassword(id, payload) {
    return http.post(`${prefix}/${id}/password`, payload);
  }
};
