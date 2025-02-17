import http from "../common/http";

export const createIncident = (params) => {
  return http.post("/incidents/create", params);
};

export const getIncidents = (code) => {
  return http.get(`/incidents/${code}`);
};
