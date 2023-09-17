import BaseAPI from "./base";

class UserAPI extends BaseAPI {
  signIn(username, password) {
    return this.post("/login", { username, password });
  }

  signUp(username, password) {
    return this.post("/register", { username, password });
  }
}

export default UserAPI;
