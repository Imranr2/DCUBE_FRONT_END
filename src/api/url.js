import BaseAPI from "./base";

class URLAPI extends BaseAPI {
  getURLs() {
    return this.get("/url");
  }

  shortenURL(original_url) {
    return this.post("/url", { original_url });
  }

  deleteURL(id) {
    return this.delete(`/url/${id}`);
  }
}

export default URLAPI;
