import http from "../common/http";

const userSignup = (params) => {
  return http.post("/auth/signup", params);
};

const userSignin = (params) => {
  return http.post("/auth/signin", params);
};

const userSignout = (params) => {
  return http.post("/auth/signout", params);
};

const userRefresh = (params) => {
  return http.get("/auth/refresh", params);
};

const userNotifications = (params) => {
  return http.get("/notifications", params);
};

export { userSignup, userSignin, userSignout, userRefresh, userNotifications };
