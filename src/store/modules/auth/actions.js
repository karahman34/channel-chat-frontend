import authApi from "../../../api/authApi";
import { applyToken, removeToken } from "../../../plugins/http";

export default {
  async login({ commit }, payload) {
    try {
      const res = await authApi.login(payload);
      const { ok, data } = res.data;

      if (!ok) throw new Error();

      const { access_token, expired_in, user } = data;

      // Set token
      const token = `Bearer ${access_token}`;

      // Apply token to http
      applyToken(token, expired_in);

      commit("SET_USER", user);
      commit("SET_LOGGED_IN", true);

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async getMe({ commit }) {
    try {
      const res = await authApi.me();
      const { ok, data } = res.data;

      if (!ok) throw new Error();

      commit("SET_USER", data.user);

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  },
  async logout({ commit }) {
    try {
      const res = await authApi.logout();
      const { ok } = res.data;

      if (!ok) throw new Error();

      removeToken();

      commit("CLEAR");

      return Promise.resolve(res);
    } catch (err) {
      return Promise.reject(err);
    }
  }
};
