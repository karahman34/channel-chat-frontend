import { http } from "@/plugins/http";

const prefix = "/users";

export default {
  register(payload) {
    return http.post(`${prefix}/register`, payload);
  },
  changePassword(id, payload) {
    return http.post(`${prefix}/${id}/password`, payload);
  },
  changeAvatar(id, payload) {
    return http.post(`${prefix}/${id}/avatar`, payload);
  }
};
