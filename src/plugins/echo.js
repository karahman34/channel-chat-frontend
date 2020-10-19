import Echo from "laravel-echo";
import Pusher from "pusher-js";
import { tokenName } from "./http";

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "pusher",
  key: process.env.VUE_APP_PUSHER_APP_KEY,
  secret: process.env.VUE_APP_PUSHER_APP_SECRET,
  cluster: "ap1",
  authEndpoint: process.env.VUE_APP_BASE_URL + "/broadcasting/auth ",
  auth: {
    headers: {
      Authorization: localStorage.getItem(tokenName)
    }
  }
});
