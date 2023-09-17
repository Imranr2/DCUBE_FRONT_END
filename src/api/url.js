import BaseAPI from "./base";

class URLAPI extends BaseAPI {
  getURLs() {
    return this.get("/url");
  }

  shortenURL(originalURL) {
    return this.post("/url", { originalURL });
  }

  deleteURL(id) {
    return this.delete(`/url/${id}`);
  }
}

export default URLAPI;
