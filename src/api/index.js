import URLAPI from "./url";
import UserAPI from "./user";

const api = Object.freeze({
  user: new UserAPI(),
  url: new URLAPI(),
});

export default api;
