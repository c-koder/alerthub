import http from "../common/http";

export const createCommunity = (params) => {
  return http.post("/communities/create", params);
};

export const joinCommunity = (params) => {
  return http.post("/communities/join", params);
};

export const listCommunities = () => {
  return http.get("/communities");
};

export const getCommunity = (code) => {
  return http.get(`/communities/${code}`);
};
