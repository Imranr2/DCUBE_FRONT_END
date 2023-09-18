import Cookies from "js-cookie";

export function setHeaders(req) {
  req.headers = {
    Authorization: Cookies.get("token"),
  };
  return req;
}

export function saveHeaders(resp) {
  var inThirtyMinutes = new Date(new Date().getTime() + 30 * 60 * 1000);
  if (resp.headers["authorization"]) {
    Cookies.set("token", resp.headers["authorization"], {
      expires: inThirtyMinutes,
    });
  }
  return resp;
}
