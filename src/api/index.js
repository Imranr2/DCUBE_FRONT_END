import UserAPI from "./user";

const api = Object.freeze({
  user: new UserAPI(),
});

export default api;
