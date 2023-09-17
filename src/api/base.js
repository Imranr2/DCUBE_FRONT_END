import authAxios from "./axios";

class BaseAPI {
  clientGet(url, config) {
    return authAxios.get(url, config);
  }

  clientPost(url, data) {
    return authAxios.post(url, data);
  }

  clientPut(url, data) {
    return authAxios.put(url, data);
  }

  clientDelete(url) {
    return authAxios.delete(url);
  }

  get(url, config) {
    return processRequest(url, this.clientGet(url, config));
  }

  post(url, data) {
    return processRequest(url, this.clientPost(url, data));
  }

  put(url, data) {
    return processRequest(url, this.clientPut(url, data));
  }

  delete(url) {
    return processRequest(url, this.clientDelete(url));
  }
}

function processRequest(endpoint, promise) {
  const DEFAULT_API_RESPONSE = Object.freeze({
    payload: null,
    message: "Request failed. Please check your Internet connection.",
    statusCode: 500,
  });

  return promise
    .then((response) => {
      const apiResponse = response.data;

      apiResponse.statusCode = response.status;

      if (process.env.NODE_ENV === "development") {
        console.info(`[API] ${endpoint} : ${apiResponse.message}`);
      }

      return apiResponse;
    })
    .catch((error) => {
      const apiResponse = {
        statusCode: error.response?.status,
        ...(error.response?.data ?? DEFAULT_API_RESPONSE),
      };

      if (process.env.NODE_ENV === "development") {
        console.error(`[API] ${endpoint} : ${apiResponse.message}`);
      }

      throw apiResponse;
    });
}

export default BaseAPI;
