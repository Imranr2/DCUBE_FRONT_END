import BaseAPI from "./base";

class URLAPI extends BaseAPI {
  getURLs(username, password) {
    return this.post("/login", { username, password });
  }

  shortenURL(originalURL) {
    return this.post("/url", { originalURL });
  }

  deleteURL(id) {
    return this.delete(`/url/${id}`);
  }
}

export default URLAPI;
