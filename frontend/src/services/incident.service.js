import http from "../common/http";

export const createIncident = (params) => {
  return http.post("/incidents/create", params);
};

export const getIncidents = (code, page = 1, limit = 10) => {
  return http.get(`/incidents/${code}?page=${page}&limit=${limit}`);
};
