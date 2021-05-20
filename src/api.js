import axios from 'axios';
const baseUrl = `${process.env.REACT_APP_TRIPS_API}/api`;

export const getAllTrips = () => {
  return axios.get(`${baseUrl}/trips`);
};
export const getMyTrips = () => {
  return axios.get(`${baseUrl}/trips`, {withCredentials: true});
};


export const getItinerary = (id) => {
  return axios.get(`${baseUrl}/trip/${id}`);
};

export const addItinerary = (title, destinations) => {
  debugger;
  return axios.post(`${baseUrl}/trips`, {title, destinations}, {withCredentials: true});
};

export const updateItinerary = (id) => {
  return axios.put(`${baseUrl}/trip/${id}`);
};





// Authentication Routes

export const signup = (username, email, password) => {
  return axios.post(`${baseUrl}/signup`, { username, email, password });
};

export const login = (username, password) => {
  return axios.post(
    `${baseUrl}/login`,
    { username, password },
    { withCredentials: true }
  );
};

export const logout = () => {
  return axios.post(`${baseUrl}/logout`, null, { withCredentials: true });
};
export const loggedin = () => {
  return axios.get(`${baseUrl}/loggedin`, { withCredentials: true });
};
