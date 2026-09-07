import axios from "axios";

const apiURL = "http://localhost:5001/users";

export const register = (user) => {
  return axios.post(`${apiURL}/register`, user, {
    withCredentials: true,
  });
};

export const login = (user) => {
  return axios.post(`${apiURL}/login`, user, {
    withCredentials: true,
  });
};

export const logout = () => {
  return axios.post(
    `${apiURL}/logout`,
    {},
    {
      withCredentials: true,
    }
  );
};

export const getProfile = () => {
  return axios.get(`${apiURL}/getprofile`, {
    withCredentials: true,
  });
};

// ==============================
// Modifier le profil
// ==============================

export const updateProfile = (user) => {

    return axios.put(
        `${apiURL}/updateprofile`,
        user,
        {
            withCredentials: true
        }
    );

};