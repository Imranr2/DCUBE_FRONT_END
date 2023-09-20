import BaseAPI from "./base";

class UserAPI extends BaseAPI {
  signIn(username, password) {
    return this.post("/signin", { username, password });
  }

  signUp(username, password) {
    return this.post("/signup", { username, password });
  }
}

export default UserAPI;
