import { http } from "@/plugins/http";

const prefix = "channels";

export default {
  newMessage(roomId, payload) {
    return http.post(`${prefix}/${roomId}`, payload);
  }
};
